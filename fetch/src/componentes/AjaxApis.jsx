import { Component } from "react";

// eslint-disable-next-line react-refresh/only-export-components
function Pokemon(prop) {
  return (
    <figure>
      <img src={prop.avatar} alt={prop.name} />
      <figcaption>{prop.name}</figcaption>
    </figure>
  );
}

export default class AjaxApis extends Component {
  state = {
    pokemons: [],
  };

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => res.json())
      .then((json) => {
        json.results.forEach((el) => {
          fetch(el.url)
            .then((res) => res.json())
            .then((json) => {
              let pokemon = {
                id: json.id,
                name: json.name,
                avatar: json.sprites.front_default,
              };

              let pokemons = [...this.state.pokemons, pokemon];

              this.setState({ pokemons });
            });
        });
      });
  }

  render() {
    return (
      <>
        <h2>Peticiones Asíncronas en Componentes de Clase</h2>
        {this.state.pokemons.length === 0 ? (
          <h3>Cargando...</h3>
        ) : (
          this.state.pokemons.map((el, id) => (
            <Pokemon key={id} name={el.name} avatar={el.avatar} />
          ))
        )}
      </>
    );
  }
}