import React from 'react';
import { useParams, Link } from 'react-router-dom';


const Pokemon = ({pokemons, trainers}) => {
    const {id} = useParams()
    const pokeId = id*1

    const pokemon = pokemons.find(poke =>{
        return poke.id === pokeId
    })
    console.log(pokemon)

    const trainer = trainers.find((train) => {
        return pokemon.trainer_id === train.id;
    })

    if(!pokemon){
        return null
    }
    
    
    console.log(trainer)
    
    return (
        <div>
            <h1>{pokemon.name}</h1>
            <hr/>
            <h3>Current Trainer:</h3>
            {trainer ? <Link to={`/trainers/${trainer.id}`}><h3>{trainer.name}</h3></Link> : <h3>No Trainer</h3>}
        </div>
    )
};

export default Pokemon;