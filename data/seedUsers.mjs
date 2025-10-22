// backend/data/seedUsers.mjs
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connectDB from '../config/db.mjs';
import User from '../models/User.mjs'; // adapte le chemin si nécessaire
import mongoose from 'mongoose';

dotenv.config();
await connectDB();

async function seed() {
  try {
    // Supprime les utilisateurs existants (optionnel)
    await User.deleteMany({});

    // Mots de passe de test (changez-les si besoin)
    const adminPassword = process.env.SEED_ADMIN_PWD || 'Password123!';
    const userPassword = process.env.SEED_USER_PWD || 'Userpass123!';

    // Hash des mots de passe
    const saltRounds = 10;
    const hashedAdminPwd = await bcrypt.hash(adminPassword, saltRounds);
    const hashedUserPwd = await bcrypt.hash(userPassword, saltRounds);

    const users = [
      {
        name: 'Admin Test',
        email: process.env.SEED_ADMIN_EMAIL || 'admin@example.com',
        password: hashedAdminPwd,
        role: 'admin',
      },
      {
        name: 'Utilisateur Test',
        email: process.env.SEED_USER_EMAIL || 'user@example.com',
        password: hashedUserPwd,
        role: 'user',
      },
    ];

    const inserted = await User.insertMany(users, { ordered: true });
    console.log('Seeded users :');
    inserted.forEach(u => {
      console.log(` - ${u.role.toUpperCase()}: ${u.email}`);
    });

    // Optionnel : affiche les identifiants de connexion en clair (utile pour tests)
    console.log('\nIdentifiants de test (plaintext) :');
    console.log(` Admin  -> ${process.env.SEED_ADMIN_EMAIL || 'admin@example.com'} / ${adminPassword}`);
    console.log(` User   -> ${process.env.SEED_USER_EMAIL || 'user@example.com'} / ${userPassword}`);
  } catch (err) {
    console.error('users seeding error :', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
