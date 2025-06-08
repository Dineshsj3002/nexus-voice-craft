exports.up = function(knex) {
  return knex.schema.createTable('chat_messages', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('conversation_id').references('id').inTable('chat_conversations').onDelete('CASCADE');
    table.uuid('sender_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('content').notNullable();
    table.enum('type', ['text', 'image', 'file', 'system']).defaultTo('text');
    table.json('metadata'); // For file info, etc.
    table.boolean('is_edited').defaultTo(false);
    table.timestamp('edited_at');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['conversation_id']);
    table.index(['sender_id']);
    table.index(['created_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('chat_messages');
};