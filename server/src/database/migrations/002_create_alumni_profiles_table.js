exports.up = function(knex) {
  return knex.schema.createTable('alumni_profiles', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('graduation_year', 4).notNullable();
    table.string('degree').notNullable();
    table.string('department');
    table.string('current_role');
    table.string('current_company');
    table.string('industry');
    table.string('location');
    table.string('linkedin_url');
    table.string('website_url');
    table.json('expertise_tags');
    table.json('achievements');
    table.json('previous_roles');
    table.boolean('willing_to_mentor').defaultTo(false);
    table.json('availability_preferences');
    table.json('privacy_settings');
    table.boolean('featured').defaultTo(false);
    table.timestamps(true, true);
    
    // Indexes
    table.index(['user_id']);
    table.index(['graduation_year']);
    table.index(['industry']);
    table.index(['willing_to_mentor']);
    table.index(['featured']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('alumni_profiles');
};