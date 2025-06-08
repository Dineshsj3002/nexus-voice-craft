exports.up = function(knex) {
  return knex.schema.createTable('notifications', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('message').notNullable();
    table.enum('type', ['mentorship', 'interview', 'event', 'forum', 'chat', 'system']).notNullable();
    table.json('data'); // Additional data for the notification
    table.boolean('is_read').defaultTo(false);
    table.timestamp('read_at');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['user_id']);
    table.index(['type']);
    table.index(['is_read']);
    table.index(['created_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notifications');
};