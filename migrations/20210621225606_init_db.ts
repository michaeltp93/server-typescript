import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posts', (table: any) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.string('slug', 60).notNullable().unique();
    table.string('title', 80).notNullable();
    table.text('content');
    table.boolean('published').notNullable().defaultTo(false);
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts');
}
