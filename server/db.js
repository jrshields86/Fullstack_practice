const pg = require('pg');
const client = new pg.Client('postgres://localhost/pokemon_world_db');

const fetchPokemon = async() => {
    const SQL = `
      SELECT * FROM pokemons
      `      
      const response = await client.query(SQL); 
      return response.rows
};

const fetchTrainers = async() => {
    const SQL = `
    SELECT * FROM trainers
    `
    const response = await client.query(SQL);
    return response.rows
};

const assignPokemon = async(pokemon) => {
    const SQL =`
    UPDATE pokemons
    SET name = $1, trainer_id = $2
    WHERE id= $3
    RETURNING *
    `
    const response = await client.query(SQL, [pokemon.name, pokemon.trainer_id, pokemon.id])
    return response.rows[0]
}



const seed = async() => {
    const SQL = `
    DROP TABLE IF EXISTS pokemons;
    DROP TABLE IF EXISTS trainers;

    CREATE TABLE trainers(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)
    );

    CREATE TABLE pokemons(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      trainer_id INTEGER REFERENCES trainer(id)
    );

    INSERT INTO trainers(name) VALUES ('Slash');
    INSERT INTO trainers(name) VALUES ('Predator');
    INSERT INTO trainers(name) VALUES ('Nixon');
    INSERT INTO trainers(name) VALUES ('Bono');
    INSERT INTO trainers(name) VALUES ('Ghandi');

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Pikachu',
      (SELECT id FROM trainer WHERE name='Slash')
    );

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Geodude',
      (SELECT id FROM trainer WHERE name='Predator')
    );

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Starmi',
      (SELECT id FROM trainer WHERE name='Nixon')
    );

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Togepi',
      (SELECT id FROM trainer WHERE name='Nixon')
    );

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Lugia',
      null
    );

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Pidgey',
      null
    );

    INSERT INTO pokemons(name, trainer_id) VALUES (
      'Snorlax',
      null
    );
  `;
    await client.query(SQL);
    }

    module.exports = {
        client,
        fetchPokemon,
        fetchTrainers,
        assignPokemon,
        seed
    }