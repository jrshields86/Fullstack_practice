const express = require('express')
const router = express.Router()
const {
    fetchPokemon,
    fetchTrainers,
    assignPokemon
} = require('./db')

router.get('/pokemons', async(req,res,next) => {
    try {
      
      res.send(await fetchPokemon())
    } catch (error) {
      next(error)
    }
    });
    
router.get('/trainers', async(req,res,next) => {
    try {
    
    res.send(await fetchTrainers())
    } catch (error) {
    next(error)
    }
    });                                
    
router.put('/pokemons/:id', async(req,res,next) => {
    try {
    res.send(await assignPokemon(req.body))
    } catch (error) {
        next(error)
    }
    });


module.exports = router