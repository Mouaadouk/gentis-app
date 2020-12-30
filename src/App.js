import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./Views/Home/index";
import PokemonTypesList from "./Views/TypesPage/PokemonWithSameType";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/pokemonTypeList" component={PokemonTypesList} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
