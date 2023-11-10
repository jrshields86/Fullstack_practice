import React from "react";
import { useParams, Link } from "react-router-dom";

const Trainer = ({trainers, pokemons}) => {
    const {id} = useParams()
    const idNum = id*1

    const trainer = trainers.find((train) => {
        return train.id === idNum
    })
    console.log(trainer)

    const pokeList = pokemons.filter((pokemon) => {
        return pokemon.trainer_id === idNum
    })

    console.log(pokeList)

    if(!trainer){
        return null
    }
    return (
        <div>
            <h2> {trainer.name} </h2>
            <hr/>
            <h3>List of Pokemon:</h3>
            {
                pokeList.map((pokemon) => {
                    return (
                        <div key={pokemon.id}>
                            <Link to={`/pokemon/${pokemon.id}`}><h5>{pokemon.name}</h5></Link>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Trainer;