import React, { useState } from "react";

const Assign = ({pokemons, trainers, assignTrainer}) => {
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');
const pokeNoTrain = pokemons.filter(pokemon => {
    return pokemon.trainer_id === null
})
console.log(pokeNoTrain)

const assign = (ev) => {
    ev.preventDefault();
    assignTrainer(selectedTrainer, selectedPokemon)
}

    return (
        <div>
            <h1>Assign</h1>
            <hr/>
            <form onSubmit={assign}>
                <select value={selectedPokemon} onChange={ev => setSelectedPokemon(ev.target.value)}>
                    <option value={''}>Choose Pokemon</option>
                    {
                        pokeNoTrain.map((poke) => {
                            return (
                                <option key={poke.id} value={poke.id}>{poke.name}</option>
                            )
                        })
                    }
                </select>
                <p>Will be assigned to...</p>
                <select value={selectedTrainer} onChange={ev => setSelectedTrainer(ev.target.value)}>
                    <option value={''}>Choose a Trainer</option>
                    {
                        trainers.map(trainer => {
                            return <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                        })
                    }
                </select>
                <div>
                    <button>Assign</button>
                </div>
            </form>
        </div>
    )
};

export default Assign;