exports.up = function(knex) {
  return knex.schema.createTable('chat_participants', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('conversation_id').references('id').inTable('chat_conversations').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('joined_at').defaultTo(knex.fn.now());
    table.timestamp('last_read_at');
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
    
    // Unique constraint
    table.unique(['conversation_id', 'user_id']);
    
    // Indexes
    table.index(['conversation_id']);
    table.index(['user_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('chat_participants');
};