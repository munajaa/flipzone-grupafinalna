
import { VideoLesson, VendorNode, DocumentResource } from './types';

/**
 * ACCESS CONFIGURATION
 */
export const ACCESS_CODE = 'FLIP2026';

/** 
 * AKADEMIJA - VIDEO LEKCIJE 
 * Ovdje dodaješ nove lekcije. Putanje za video idu u /video/ folder.
 */
export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: '1',
    title: '1. Osnove Resellinga: Odakle početi?',
    description: 'Prvi korak u tvojoj karijeri. Učimo kako funkcioniše tržište na Balkanu, koji su rizici i koliki budžet ti je potreban za start.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    videoUrl: '/video/lesson1.mp4',
    duration: '10:15',
    category: 'Basics',
    instructor: 'Marko Flip',
    dateAdded: 'Nivo: Početni'
  },
  {
    id: '2',
    title: '2. Kreiranje oglasa koji prodaju',
    description: 'Psihologija kupca. Kako slikati robu i napisati opis koji tera ljude da kliknu "Kupi odmah" bez puno pitanja.',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    videoUrl: '/video/lesson2.mp4',
    duration: '15:30',
    category: 'Basics',
    instructor: 'Luka Marketing',
    dateAdded: 'Nivo: Početni'
  },
  {
    id: '3',
    title: '3. Sneakers: Kako prepoznati profit?',
    description: 'Analiza tržišta patika. Koji modeli drže cenu, a koji su "brickovi". Uvod u StockX i GOAT analitiku.',
    thumbnail: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    videoUrl: '/video/lesson3.mp4',
    duration: '22:45',
    category: 'Sneakers',
    instructor: 'Stefan Kix',
    dateAdded: 'Nivo: Srednji'
  }
];

/** 
 * VENDOR HUB - MICRO VENDORS 
 */
export const VENDORS: VendorNode[] = [
  {
    id: 'v1',
    title: 'iPhone 15/16 Pro',
    subTitle: 'EU Direct Wholesale',
    description: 'Najtraženiji Apple uređaji sa garancijom. Direktni uvoz bez posrednika.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    metrics: { profit: '150-250€', demand: 'hot', risk: 'low' },
    link: 'https://t.me/flipzone_apple',
    tags: ['Apple', 'Phones', 'Top Profit']
  },
  {
    id: 'v2',
    title: 'AirPods Specialist',
    subTitle: 'Premium Audio Bulk',
    description: 'Originalni AirPods modeli u rinfuzi. Idealno za brzu prodaju na oglasima.',
    image: 'https://images.unsplash.com/photo-1588423770186-80f85631f672?auto=format&fit=crop&q=80&w=800',
    category: 'Audio',
    metrics: { profit: '40-70€', demand: 'hot', risk: 'low' },
    link: 'https://t.me/flipzone_audio',
    tags: ['Accessories', 'Audio']
  },
  {
    id: 'v3',
    title: 'Jordan 4 Retro',
    subTitle: 'Hype Sneakers Hub',
    description: 'Specijalizovani vendor samo za J4 modele. Proveren legitimitet i brza dostava.',
    image: 'https://images.unsplash.com/photo-1597040966224-4f056d682a0b?auto=format&fit=crop&q=80&w=800',
    category: 'Sneakers',
    metrics: { profit: '100-300€', demand: 'hot', risk: 'medium' },
    link: 'https://t.me/flipzone_sneakers',
    tags: ['Jordan', 'Limited']
  }
];

export const DOCUMENTS: DocumentResource[] = [
  {
    id: 'd1',
    title: 'Ugovor o Posredovanju v2.0',
    description: 'Pravno verifikovan šablon za bezbedno posredovanje između dobavljača i krajnjeg kupca.',
    pdfUrl: '/pdf/ugovor_v2.pdf',
    category: 'Pravno',
    fileSize: '1.2 MB'
  },
  {
    id: 'd2',
    title: 'Full Reselling Inventory',
    description: 'Napredna Excel/PDF tabela za praćenje svakog centa, od nabavne cene do čiste zarade.',
    pdfUrl: '/pdf/inventory_tracker.pdf',
    category: 'Logistika',
    fileSize: '4.5 MB'
  }
];
