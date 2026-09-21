import type { Product } from '../store/useStore';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Govinda Namallu Devotional Embroidered Shirt',
    basePrice: 499,
    msrp: 799,
    description: 'Premium quality devotional shirt with intricate Govinda Namallu embroidery. Perfect for temple visits and sacred occasions.',
    image: '/shirt_white_govinda_1790012536213.jpg',
    badge: 'Bestseller',
    rating: 4.8,
    options: {
      sizes: [
        { id: 's38', name: '38' },
        { id: 's40', name: '40' },
        { id: 's42', name: '42' },
        { id: 's44', name: '44' },
      ],
      colors: [
        { id: 'cWhite', name: 'Pure White' },
        { id: 'cCream', name: 'Divine Cream' },
      ]
    }
  },
  {
    id: 'p2',
    name: 'Royal Bridal Peacock Computer Maggam Blouse',
    basePrice: 1499,
    description: 'Exquisite computer maggam work featuring royal peacock motifs with premium zari. Designed to make your bridal look unforgettable.',
    image: '/blouse_maggam_1790012414191.jpg',
    badge: 'Bridal Special',
    rating: 4.9,
    options: {
      colors: [
        { id: 'cRed', name: 'Ruby Red' },
        { id: 'cPink', name: 'Rani Pink' },
        { id: 'cBlue', name: 'Royal Blue' },
        { id: 'cPurple', name: 'Wine Purple' },
      ],
      workTypes: [
        { id: 'wStandard', name: 'Standard Neck', priceModifier: 0 },
        { id: 'wHeavy', name: 'Heavy Bridal (Neck & Sleeves)', priceModifier: 1000 },
      ]
    }
  },
  {
    id: 'p3',
    name: 'Sabarimala Ayyappa Swamy Devotional Shirt',
    basePrice: 599,
    description: 'Jet black devotional shirt featuring sacred Ayyappa Swamy embroidery. Crafted for the holy Sabarimala pilgrimage with breathable fabric.',
    image: '/shirt_black_ayyappa_1790012430402.jpg',
    rating: 4.7,
    options: {
      sizes: [
        { id: 's38', name: '38' },
        { id: 's40', name: '40' },
        { id: 's42', name: '42' },
        { id: 's44', name: '44' },
      ],
      colors: [
        { id: 'cBlack', name: 'Jet Black' },
      ]
    }
  },
  {
    id: 'p4',
    name: 'Sri Venkateswara Swamy 3D Zari Photo Frame',
    basePrice: 1599,
    description: 'Divine 3D zari embroidered portrait of Lord Venkateswara. A magnificent addition to your pooja room or a perfect gifting choice.',
    image: '/photo_frame_zari_1790012456223.jpg',
    badge: 'Pooja Essential',
    rating: 5.0,
    options: {}
  }
];
