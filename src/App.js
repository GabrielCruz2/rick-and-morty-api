// imports \\

import React, { useEffect, useState } from 'react';
import './styled/App.css';
import './styled/index.css';


// edit \\

const g = {
  'load': {
    'page': '1', // Altere aqui a pagina para alterar a lista de episódios \\
    'link': 'https://rickandmortyapi.com/api/character/?page=', // Altere aqui o link da API \\
  },
}


// function \\

function App() {

  // get \\

  const [ search, setSearch ] = useState('')
  const [ getConteudo, setConteudo ] = useState(<></>)
  const [ getPage, setPage ] = useState(1)


  // getResultAllCharacter \\

  async function loadAllCharacter( ){

    var requestOption = {
      method: 'GET',
      redirect: 'follow'
    };

    const result = await fetch('https://rickandmortyapi.com/api/character/?page='+ getPage +'&status='+ search,
    requestOption
    )
    .then(response => response.text())
    .then(result => { return result })
    .catch(error => console.log('error', error));

    const char = JSON.parse(result);

    return char.results
  };


  // getRenderCharacter \\

  async function listCharacter( ){
    const all = await loadAllCharacter( );

    return all.map(e => 
      <div className='card char'>
        <div>
          <img src={ e.image } alt={ e.name }/>
        </div>
        <div>
          <h2>{ e.name }</h2>
        </div>
        <div className='char-info'>
          <span>Espécie: { ( e.species === 'Human' ? 'Humano' : 'Não Humano' ) }</span>
        </div>
        <div className='char-info'>
          <span>Gênero: { ( e.gender === 'Male' ? 'Masculino' : ( e.gender === 'unknown' ? 'Desconhecido' : (e.gender === 'Genderless' ? 'Sem Gênero' : 'Feminino') ) ) }</span>
        </div>
        <div className='char-info lista-secundaria'>
          <span className='episodes'>Participações:</span>
          <span className='listep'>{ e.episode.map(ep => 
              <p>EP-{ ( ep.charAt(40) < 1 ? '' + ep.charAt(40) + '' : ''+ ep.charAt(40) + '' + ep.charAt(41) +'' ) }</p>
            )
          }</span>
          <span className='listep'>Quantidade: { e.episode.length }</span>
        </div>
        <div className='char-info'>
          <span>Status: { ( e.status === 'Alive' ? 'Vivo' : ( e.status === 'unknown' ? 'Desconhecido' : 'Morto' ) ) }</span>
        </div>
      </div>
    )
  };


  // setRender \\

  useEffect(( ) => {
    async function load(){
      setConteudo( await listCharacter( getPage ) );
    }
    
    load()
  }, [search, getPage]);


  // getRender \\

  return (
    <div className='App'>
      <header className='cabecalho'>
        <h1>Rick and Morty API</h1>
      </header>
      <div className='filtros'>
        <span className='filtros-titulo'>Filtros</span>
        <div className='filtro status'>
          <b>Status:</b>
          <span onClick={() => setSearch('live')}>Vivo</span>
          <span onClick={() => setSearch('dead')}>Morto</span>
          <span onClick={() => setSearch('unknown')}>Desconhecido</span>
        </div>
        <div className='filtro genero'>
          <b>Gênero:</b>
          <span onClick={() => setSearch('&gender=male')}>Masculino</span>
          <span onClick={() => setSearch('&gender=female')}>Feminino</span>
          <span onClick={() => setSearch('&gender=Genderless')}>Sem Gênero</span>
          <span onClick={() => setSearch('&gender=unknown')}>Desconhecido</span>
        </div>
      </div>
      <div className='lista-principal'>
        { getConteudo }
      </div>
      <div className='buttons'>
        <span className='page'>Página Atual: { (getPage <= 9 ? '0'+getPage : getPage) }</span>
        <div className='buttons-container'>
          <div className='buttons-item'>
            <button className='button prev' onClick={() => (getPage > 1 ? setPage(getPage - 1) : setPage(1))}>❮</button>
          </div>
          <div className='buttons-item'>
            <button className='button next' onClick={() => (getPage === 800 ? setPage(1) : setPage(getPage + 1))}>❯</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};


// export function \\

export default App;