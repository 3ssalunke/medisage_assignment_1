const { v4: uuidv4 } = require("uuid");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("student")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("student").insert([
        {
          id: uuidv4(),
          name: "test",
          phone_number: 9238388339,
          email: "test@test.com",
          country: "India",
          country_code: "IN",
        },
      ]);
    });
};
