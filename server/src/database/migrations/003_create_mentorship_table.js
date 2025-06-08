exports.up = function(knex) {
  return knex.schema.createTable('mentorship_requests', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('mentee_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('mentor_id').references('id').inTable('users').onDelete('CASCADE');
    table.enum('status', ['pending', 'accepted', 'declined', 'completed']).defaultTo('pending');
    table.text('message');
    table.text('mentor_response');
    table.json('goals');
    table.timestamp('accepted_at');
    table.timestamp('completed_at');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['mentee_id']);
    table.index(['mentor_id']);
    table.index(['status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mentorship_requests');
};