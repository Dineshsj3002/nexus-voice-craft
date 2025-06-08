const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  const passwordHash = await bcrypt.hash('password123', 12);
  
  // Insert seed entries
  await knex('users').insert([
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'admin@kiot.ac.in',
      password_hash: passwordHash,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      is_active: true,
      email_verified: true
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'sarah.johnson@example.com',
      password_hash: passwordHash,
      first_name: 'Sarah',
      last_name: 'Johnson',
      role: 'alumni',
      is_active: true,
      email_verified: true,
      avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      email: 'michael.chen@example.com',
      password_hash: passwordHash,
      first_name: 'Michael',
      last_name: 'Chen',
      role: 'alumni',
      is_active: true,
      email_verified: true,
      avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      email: 'alex.student@example.com',
      password_hash: passwordHash,
      first_name: 'Alex',
      last_name: 'Student',
      role: 'student',
      is_active: true,
      email_verified: true
    }
  ]);
};