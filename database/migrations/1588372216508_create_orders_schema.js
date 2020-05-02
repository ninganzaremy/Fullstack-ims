
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateOrdersSchema extends Schema {
  up () {
    this.raw(
    `CREATE TABLE orders(
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      f_name VARCHAR(200) NOT NULL,
      l_name VARCHAR(60) NOT NULL,
      adress VARCHAR(100) NOT NULL,
      adress_2 VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(160) NOT NULL,
      country VARCHAR(3) NOT NULL DEFAULT 'USA',
      payment_type VARCHAR(60) NOT NULL DEFAULT 'paypal',
      user_id INT UNSIGNED NOT NULL,
      price VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
  }

  down () {
    this.raw(`DROP TABLE orders`)

  }
}

module.exports = CreateOrdersSchema
