exports.up = function(knex) {
  return knex.schema.createTable('events', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organizer_id').references('id').inTable('users').onDelete('SET NULL');
    table.string('title').notNullable();
    table.text('description');
    table.enum('type', ['workshop', 'networking', 'panel', 'program', 'mentoring', 'career_fair', 'hackathon', 'competition']).notNullable();
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date');
    table.string('location');
    table.boolean('is_virtual').defaultTo(false);
    table.string('meeting_link');
    table.integer('max_attendees');
    table.integer('current_attendees').defaultTo(0);
    table.decimal('price', 10, 2).defaultTo(0);
    table.string('image_url');
    table.json('tags');
    table.boolean('featured').defaultTo(false);
    table.boolean('alumni_only').defaultTo(false);
    table.string('sponsored_by');
    table.enum('status', ['draft', 'published', 'cancelled', 'completed']).defaultTo('draft');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['organizer_id']);
    table.index(['type']);
    table.index(['start_date']);
    table.index(['featured']);
    table.index(['status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('events');
};