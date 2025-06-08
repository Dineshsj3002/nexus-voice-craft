exports.up = function(knex) {
  return knex.schema.createTable('event_registrations', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.enum('status', ['registered', 'attended', 'cancelled']).defaultTo('registered');
    table.text('dietary_requirements');
    table.text('additional_info');
    table.timestamp('registered_at').defaultTo(knex.fn.now());
    table.timestamps(true, true);
    
    // Unique constraint
    table.unique(['event_id', 'user_id']);
    
    // Indexes
    table.index(['event_id']);
    table.index(['user_id']);
    table.index(['status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('event_registrations');
};