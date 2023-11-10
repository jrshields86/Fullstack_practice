import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Pokemons from './Pokemons';

  const Trainers = ({trainers}) => {
    return (
      <div>
        <h1>All the Trainers</h1>
        {
          trainers.map(trainer => {
            return(
              <div key={trainer.id}>
                <Link to={`/trainers/${trainer.id}`}><h3>{trainer.name}</h3></Link>
              </div>
              
            )
          })
        }

      </div>
    )
  };

  export default Trainers;