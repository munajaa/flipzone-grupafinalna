
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature error: ${err.message}`);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const email = session.customer_details?.email || session.customer_email;
    const userIdInMetadata = session.metadata.netlify_user_id;

    console.log(`Processing payment for email: ${email}`);

    // Postavke za Identity Admin API
    const adminHeaders = {
      'Authorization': `Bearer ${process.env.NETLIFY_IDENTITY_ADMIN_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      let targetUserId = userIdInMetadata;

      // 1. Ako nemamo ID u metadata, pokušaj naći korisnika po emailu
      if (!targetUserId && email) {
        const listUrl = `${process.env.URL}/.netlify/identity/admin/users`;
        const listResponse = await fetch(listUrl, { headers: adminHeaders });
        if (listResponse.ok) {
          const { users } = await listResponse.json();
          const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (existingUser) {
            targetUserId = existingUser.id;
          }
        }
      }

      // 2. Ako korisnik postoji -> Update role
      if (targetUserId) {
        console.log(`Granting 'paid' role to existing user: ${targetUserId}`);
        const updateUrl = `${process.env.URL}/.netlify/identity/admin/users/${targetUserId}`;
        await fetch(updateUrl, {
          method: 'PUT',
          headers: adminHeaders,
          body: JSON.stringify({ app_metadata: { roles: ['paid'] } }),
        });
      } 
      // 3. Ako korisnik NE POSTOJI -> Pošalji INVITE
      else if (email) {
        console.log(`No user found for ${email}. Sending invite with 'paid' role.`);
        const inviteUrl = `${process.env.URL}/.netlify/identity/admin/users/invite`;
        await fetch(inviteUrl, {
          method: 'POST',
          headers: adminHeaders,
          body: JSON.stringify({ 
            email, 
            app_metadata: { roles: ['paid'] } 
          }),
        });
      }
    } catch (err) {
      console.error(`Error during Identity update: ${err.message}`);
      return { statusCode: 500, body: 'Internal Error during Identity update' };
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
