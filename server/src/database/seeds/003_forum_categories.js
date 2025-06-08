exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('forum_categories').del();
  
  // Insert seed entries
  await knex('forum_categories').insert([
    {
      id: '550e8400-e29b-41d4-a716-446655440101',
      name: 'General Discussion',
      description: 'Open discussions for all members of alumNexus community',
      icon: 'MessageSquare',
      color: 'blue',
      sort_order: 1
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440102',
      name: 'Networking',
      description: 'Connect with fellow alumni and students for professional networking',
      icon: 'Users',
      color: 'purple',
      sort_order: 2
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440103',
      name: 'Career Advice',
      description: 'Seek and share career guidance and job opportunities',
      icon: 'Briefcase',
      color: 'green',
      sort_order: 3
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440104',
      name: 'Technology',
      description: 'Discuss the latest in technology, coding, and digital innovation',
      icon: 'Code',
      color: 'indigo',
      sort_order: 4
    }
  ]);
};