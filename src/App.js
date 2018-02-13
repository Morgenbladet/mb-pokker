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

    this.scenarios = this.loadScenarios();
    this.state = this.initialState();
  }

  init() {
    this.setState(this.initialState());
  }

  beginTest() {
    this.setState( { current_scenario: 0 } );
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
    return(scenario_definitions);
  }

  begun() {
    return(this.state.current_scenario !== null );
  }

  finished() {
    return ( this.state.current_scenario >= this.scenarios.length );
  }

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
