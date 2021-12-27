exports.up = function (knex) {
  return knex.schema.createTable("student", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.integer("phone_number").unique().notNullable();
    table.string("country").notNullable();
    table.string("country_code").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("student");
};
