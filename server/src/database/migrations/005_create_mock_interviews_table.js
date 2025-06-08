exports.up = function(knex) {
  return knex.schema.createTable('mock_interviews', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('student_id').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('interviewer_id').references('id').inTable('users').onDelete('SET NULL');
    table.string('title').notNullable();
    table.text('description');
    table.enum('type', ['technical', 'behavioral', 'case_study', 'virtual', 'executive']).notNullable();
    table.timestamp('scheduled_at');
    table.integer('duration_minutes').defaultTo(60);
    table.enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled']).defaultTo('scheduled');
    table.json('questions');
    table.json('feedback');
    table.integer('rating');
    table.text('notes');
    table.string('meeting_link');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['student_id']);
    table.index(['interviewer_id']);
    table.index(['type']);
    table.index(['status']);
    table.index(['scheduled_at']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mock_interviews');
};