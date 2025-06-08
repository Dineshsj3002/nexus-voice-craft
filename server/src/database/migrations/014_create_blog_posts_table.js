exports.up = function(knex) {
  return knex.schema.createTable('blog_posts', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('author_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('excerpt');
    table.text('content').notNullable();
    table.string('category').notNullable();
    table.string('image_url');
    table.json('tags');
    table.integer('read_time'); // in minutes
    table.integer('likes').defaultTo(0);
    table.integer('views').defaultTo(0);
    table.boolean('featured').defaultTo(false);
    table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft');
    table.timestamp('published_at');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['author_id']);
    table.index(['category']);
    table.index(['status']);
    table.index(['featured']);
    table.index(['published_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('blog_posts');
};