exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('alumni_profiles').del();
  
  // Insert seed entries
  await knex('alumni_profiles').insert([
    {
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      graduation_year: '2015',
      degree: 'Computer Science',
      department: 'Engineering',
      current_role: 'Senior Software Engineer',
      current_company: 'Google',
      industry: 'Technology',
      location: 'San Francisco, CA',
      linkedin_url: 'https://linkedin.com/in/sarahjohnson',
      expertise_tags: JSON.stringify(['React', 'Cloud Architecture', 'System Design', 'Technical Leadership']),
      achievements: JSON.stringify(['Google Developer Expert', 'Speaker at Google I/O 2023']),
      willing_to_mentor: true,
      featured: true,
      privacy_settings: JSON.stringify({
        mentorshipVisibility: 'all',
        profileDetailLevel: 'full',
        contactMethods: ['platform', 'email', 'video'],
        allowSpotlight: true
      })
    },
    {
      user_id: '550e8400-e29b-41d4-a716-446655440003',
      graduation_year: '2018',
      degree: 'Business Administration',
      department: 'Business',
      current_role: 'Product Manager',
      current_company: 'Amazon',
      industry: 'E-commerce',
      location: 'Seattle, WA',
      linkedin_url: 'https://linkedin.com/in/michaelchen',
      expertise_tags: JSON.stringify(['Product Strategy', 'Career Transitions', 'Networking']),
      achievements: JSON.stringify(['Led development of Amazon checkout optimization']),
      willing_to_mentor: true,
      featured: false
    }
  ]);
};