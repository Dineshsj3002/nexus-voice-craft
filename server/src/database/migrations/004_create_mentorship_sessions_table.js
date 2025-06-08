exports.up = function(knex) {
  return knex.schema.createTable('mentorship_sessions', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('mentorship_id').references('id').inTable('mentorship_requests').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description');
    table.timestamp('scheduled_at').notNullable();
    table.integer('duration_minutes').defaultTo(60);
    table.enum('status', ['scheduled', 'completed', 'cancelled']).defaultTo('scheduled');
    table.text('notes');
    table.json('feedback');
    table.string('meeting_link');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['mentorship_id']);
    table.index(['scheduled_at']);
    table.index(['status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mentorship_sessions');
};