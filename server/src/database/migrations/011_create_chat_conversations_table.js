exports.up = function(knex) {
  return knex.schema.createTable('chat_conversations', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name'); // For group chats
    table.enum('type', ['direct', 'group']).defaultTo('direct');
    table.uuid('created_by').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('last_message_at');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['type']);
    table.index(['last_message_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('chat_conversations');
};