exports.up = function(knex) {
  return knex.schema.createTable('forum_posts', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('category_id').references('id').inTable('forum_categories').onDelete('CASCADE');
    table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.json('tags');
    table.integer('views').defaultTo(0);
    table.integer('likes').defaultTo(0);
    table.integer('replies_count').defaultTo(0);
    table.boolean('is_pinned').defaultTo(false);
    table.boolean('is_locked').defaultTo(false);
    table.timestamp('last_activity').defaultTo(knex.fn.now());
    table.timestamps(true, true);
    
    // Indexes
    table.index(['category_id']);
    table.index(['author_id']);
    table.index(['last_activity']);
    table.index(['is_pinned']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('forum_posts');
};