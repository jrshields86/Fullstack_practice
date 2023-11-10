const pg = require('pg');
const client = new pg.Client('postgres://localhost/pokemon_world_db');
const express = require('express');
const app = express();
const path = require('path');                                                                                                                                                                                                                                                                                                                                                                                

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

app.use(express.json());

app.get('/api/pokemons', async(req,res,next) => {
try {
  const SQL = `
  SELECT * FROM pokemons
  `                         
  const response = await client.query(SQL);
  res.send(response.rows)
} catch (error) {
  next(error)
}
});

app.get('/api/trainers', async(req,res,next) => {
  try {
    const SQL = `
    SELECT * FROM trainers
    `
    const response = await client.query(SQL);
    res.send(response.rows)
  } catch (error) {
    next(error)
  }
  });                                

  app.put('/api/pokemons/:id', async(req,res,next) => {
    try {
      const SQL =`
        UPDATE pokemons
        SET name = $1, trainer_id = $2
        WHERE id= $3
        RETURNING *
      `
      const response = await client.query(SQL, [req.body.name, req.body.trainer_id, req.params.id])
      res.send(response.rows[0])
    } catch (error) {
      next(error)
    }
  });

const init = async()=> {
  await client.connect();
  console.log('connected to database');
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
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
