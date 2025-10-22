import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.mjs';
import connectDB from '../config/db.mjs';

dotenv.config();
await connectDB();

const sample = [
  {
    name: 'T-shirt Bleu',
    description: 'T-shirt en coton doux, parfait pour un usage quotidien.',
    price: 19.99,
    category: 'Vêtements',
    countInStock: 10,
    images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800']
  },
  {
    name: 'Casquette',
    description: 'Casquette unisexe ajustable avec logo brodé.',
    price: 12.5,
    category: 'Accessoires',
    countInStock: 25,
    images: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800']
  },
  {
    name: 'Chaussures Sport',
    description: 'Chaussures confortables pour le sport ou les balades.',
    price: 59.99,
    category: 'Chaussures',
    countInStock: 5,
    images: ['https://images.unsplash.com/photo-1528701800489-20be1c1b1c52?w=800']
  },
  {
    name: 'T-shirt Coton Premium',
    description: 'T-shirt 100% coton bio, respirant et doux.',
    price: 24.99,
    category: 'Vêtements',
    countInStock: 20,
    images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800']
  },
  {
    name: 'Pantalon Jogging Confort',
    description: 'Pantalon de sport léger et extensible, parfait pour la détente.',
    price: 39.99,
    category: 'Vêtements',
    countInStock: 12,
    images: ['https://images.unsplash.com/photo-1593032457861-4d5ee0e7f26b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Casque Bluetooth X300',
    description: 'Casque sans fil avec réduction de bruit et 20h d’autonomie.',
    price: 89.99,
    category: 'Électronique',
    countInStock: 8,
    images: ['https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800']
  },
  {
    name: 'Montre Connectée FitTime',
    description: 'Montre intelligente avec suivi du sommeil, rythme cardiaque et notifications.',
    price: 129.99,
    category: 'Accessoires',
    countInStock: 15,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800']
  },
  {
    name: 'Sac à Dos Voyage 25L',
    description: 'Sac à dos résistant à l’eau, idéal pour le travail ou les courts voyages.',
    price: 49.99,
    category: 'Bagagerie',
    countInStock: 10,
    images: ['https://images.unsplash.com/photo-1600180758890-6b94519a8ba2?w=800']
  },
  {
    name: 'Sneakers Classiques',
    description: 'Chaussures basses en toile, confortables et tendance.',
    price: 54.99,
    category: 'Chaussures',
    countInStock: 7,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800']
  }
];

async function seed() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log('Seeding success !');
  } catch (err) {
    console.error('seeding error :', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
