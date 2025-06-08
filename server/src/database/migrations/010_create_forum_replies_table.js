exports.up = function(knex) {
  return knex.schema.createTable('forum_replies', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('post_id').references('id').inTable('forum_posts').onDelete('CASCADE');
    table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('parent_reply_id').references('id').inTable('forum_replies').onDelete('CASCADE');
    table.text('content').notNullable();
    table.integer('likes').defaultTo(0);
    table.timestamps(true, true);
    
    // Indexes
    table.index(['post_id']);
    table.index(['author_id']);
    table.index(['parent_reply_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('forum_replies');
};