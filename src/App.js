import React, { Component } from 'react';
import './App.css';
import Scenario from './Scenario.js';
import scenario_definitions from './scenario_definitions.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.beginTest = this.beginTest.bind(this);
    this.init = this.init.bind(this);
    this.finished = this.finished.bind(this);
    this.loadScenarios = this.loadScenarios.bind(this);
    this.updateScore = this.updateScore.bind(this);

    this.scenarios = this.loadScenarios();
    this.state = this.initialState();
  }

  // Initialization
  init() {
    this.setState(this.initialState());
  }

  initialState() {
    return (
      {
        current_scenario: null,
        age_entries: [],
        geo_entries: [],
        sex_entries: [],
        edu_entries: []
      }
    );
  }

  loadScenarios() {
    return(scenario_definitions.map((scen) => <Scenario key={ scen.id } scen={ scen } updateScore={ this.updateScore }/>));
  }

  // Methods
  beginTest() {
    this.setState( { current_scenario: 0 } );
  }

  updateScore(alternative) {
    this.setState((prevState, props) => ({
      age_entries: [...prevState.age_entries, alternative.age],
      geo_entries: [...prevState.geo_entries, alternative.geo],
      sex_entries: [...prevState.sex_entries, alternative.sex],
      edu_entries: [...prevState.edu_entries, alternative.edu],
      current_scenario: prevState.current_scenario + 1
    }));
  }

  // Getters and helpers

  begun() {
    return(this.state.current_scenario !== null );
  }

  finished() {
    return ( this.state.current_scenario >= this.scenarios.length );
  }

  average(arr) {
    if (arr.length > 0) {
      return(arr.reduce((p, c) => p + c, 0) / arr.length);
    } else {
      return(null);
    }
  }

  age() { return this.average(this.state.age_entries); }
  geo() { return this.average(this.state.geo_entries); }
  sex() { return this.average(this.state.sex_entries); }
  edu() { return this.average(this.state.edu_entries); }

  // View

  render() {
    if (! this.begun()) {
      return (
        <div className="app">
          <p>En interessant velkommen-tekst her.</p>
          <button onClick={ this.beginTest }>Start testen!</button>
        </div>
      );
    } else if (this.finished()) {
      return (
        <div className="app">
          Age: { this.age() }
          Geo: { this.geo() }
          Sex: { this.sex() }
          Edu: { this.edu () }
          <p>Du er ferdig og her skal vi lage en resultatskjerm.</p>
          <button onClick={ this.init }>Begynn på nytt</button>
        </div>
      );
    } else {
      let id = this.state.current_scenario;

      return (
        <div className="app">
          { this.scenarios[id] }
        </div>
      );
    }
  }
}

export default App;
