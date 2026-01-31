
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { userId, email } = JSON.parse(event.body);

  try {
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Flipzone Balkan Access',
              description: 'Ulaz u privatnu reselling zajednicu i edukaciju.',
            },
            unit_amount: 2999, // 29.99 EUR
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/app/?success=true`,
      cancel_url: `${process.env.URL}/no-access`,
      metadata: {},
    };

    if (userId) {
      sessionConfig.metadata.netlify_user_id = userId;
    }
    
    if (email) {
      sessionConfig.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
