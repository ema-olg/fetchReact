import React from 'react';


// eslint-disable-next-line react-refresh/only-export-components
function Pokemon(prop){
    return(
        <>
        <h3>{prop.name}</h3>
        <img src={prop.avatar} alt={prop.name} />
        </>
    )
}

export default class FetchR extends React.Component{
        state={
            pokemones: []
        }

    componentDidMount(){
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(res=> res.json())
            .then(json=> {
                console.log(json)
                json.results.forEach((el) => {
                        let pokemon={
                            name: el.name
                        }
                        
                    // En la proxima linea de código en "pokemones" es un array donde guarda 
                    // "this.state.pokemones" y agrega otro indice con el objeto "pokemon".
                        let pokemones= [...this.state.pokemones, pokemon]
                    // "this.setState()" re-escribe "this.state.pokemones" con "pokemones" 
                    // de la linea anterior, y esto sucede cada vez que el objeto 
                    // "json.results" es iterado.
                    // Pero por alguna razon no funciona, solo guarda los dos últimos datos y lo hace 2 veces
                        this.setState({ pokemones })
                    })
                });
        }
        
        render(){
        return(
            <>
            <h1>React Fetch</h1>
            {this.state.pokemones.length=== 0 
            ?<h1>Cargando</h1> 
            :this.state.pokemones.map((el, id)=>(
                <Pokemon key={id} name= {el.name} avatar={el.avatar}/>
            ))}
            </>
        )
    }
}