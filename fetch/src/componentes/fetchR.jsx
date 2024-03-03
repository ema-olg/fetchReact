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
            pokemons: []
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
                        let pokemons= [...this.state.pokemons, pokemon]
                        this.setState({ pokemons })
                    })
                });
        }
        
        render(){
        return(
            <>
            <h1>React Fetch</h1>
            {this.state.pokemons.length=== 0 
            ?<h1>Cargando</h1> 
            :this.state.pokemons.map((el, id)=>(
                <Pokemon key={id} name= {el.name} avatar={el.avatar}/>
            ))}
            </>
        )
    }
}