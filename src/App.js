import React, { useState, useEffect } from 'react'
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Components/Header/Header'
import Filter from './Components/Filter/Filter'
import Pokemon from './Components/Pokemon/Pokemon'
import Loading from './Components/Loading'
import axios from 'axios'
import './App.css';

const types = [];
const weaknesses = [];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:500,
    border: '1px solid #ffdd56'
  },
  paper: {
    position: 'absolute',
    border: 'none'
  }
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const fetchUrl = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [inputFilter, setInputFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [weaknessFilter, setWeaknessFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl)
      setPokemons(response.data.pokemon)
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Collecting types from all Pokemons
    pokemons.map(pokemon => pokemon.type.forEach(type => {
      if (types.indexOf(type) < 0)
        types.push(type);
    }))
    types.sort();

    // Collecting weaknesses from all Pokemons
    pokemons.map(pokemon => pokemon.weaknesses.forEach(weakness => {
      if (weaknesses.indexOf(weakness) < 0)
        weaknesses.push(weakness);
    }))
    weaknesses.sort();
  }, [pokemons]);

  const handleInputChange = (event) => {
    setInputFilter(event.target.value);
  }

  const handleTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  }

  const handleWeaknessFilter = (event) => {
    setWeaknessFilter(event.target.value);
  }

  const handlePokemonClick = (event, data) => {
    setCurrentPokemon(data);
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false);
    // setCurrentPokemon(null);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <center className="center">
        <div className="card">
          <img className="card-image" src={ currentPokemon.img } />
          <h1 className="card-name">{ currentPokemon.name }</h1>
          <hr/>
          <h5 className="card-num"> # { currentPokemon.num }</h5>
          <div className="card-data">
            <p>
              Type:
              { currentPokemon.type ? currentPokemon.type.map(m => <label className="type" key={ m }>{ m } </label>) : ""}
            </p>
            <p>
            Weaknesses:
            { currentPokemon.weaknesses ? currentPokemon.weaknesses.map(w => <label className="weakness" key={ w }>{ w } </label>) : ""}
            </p>
            <p>
            Height:
            <label className="height"> { currentPokemon.height } </label>
            </p>
            <p>
            Weight:
            <label className="weight"> { currentPokemon.weight } </label>
            </p>
          </div>
          <div className="prevnext">
            <div className="prev">
            <h4>PREV</h4>
            { currentPokemon.prev_evolution ? currentPokemon.prev_evolution.map(pe => <label key={ pe.name }>{ pe.name } </label>) : ""}
            </div>
            <div className="next">
            <h4>NEXT</h4>
            <h1>  </h1>{ currentPokemon.next_evolution ? currentPokemon.next_evolution.map(ne => <label key={ ne.name }>{ ne.name } </label>) : ""}
            </div>
          </div>
        </div>
      </center>
    </div>
  );

  let filteredPokemons = pokemons.filter((pokemon) => {
    let filteredName = pokemon.name.toLowerCase().includes(inputFilter.toString().toLowerCase());
    let filteredType = false;
    let filteredWeakness = false;

    var tempTypes = pokemon.type.toString();
    if (typeFilter.length < 1)
      filteredType = true;

    typeFilter.forEach(t => {
      if (tempTypes.includes(t))
        filteredType = true;
    })

    var tempWeaknesses = pokemon.weaknesses.toString();
    if (weaknessFilter.length < 1)
      filteredWeakness = true;

    weaknessFilter.forEach(w => {
      if (tempWeaknesses.includes(w))
        filteredWeakness = true;
    })

    return filteredName && filteredType && filteredWeakness
  })

  return (
    <div className="app">
      <div className="app-header">
        <Header />
      </div>
      { loading ? <Loading /> : (
        <div className="app-body">
          <div className="app-filter">
            <Filter
              handleInputChange={handleInputChange}
              types={types}
              typeFilter={typeFilter}
              weaknesses={weaknesses}
              weaknessFilter={weaknessFilter}
              handleTypeFilter={handleTypeFilter}
              handleWeaknessFilter={handleWeaknessFilter} />
          </div>
          <div className="app-pokemon">
            <Pokemon pokemons={filteredPokemons} handlePokemonClick={handlePokemonClick} />
          </div>
        </div>
      )}
      <div>
        <Modal className="modal" open={modalOpen} onClose={handleModalClose}>
          {body}
        </Modal>
      </div>
    </div>
  );
}

export default App;
