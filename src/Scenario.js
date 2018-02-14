import React, { Component } from 'react';
import Alternative from './Alternative.js';
import shuffleArray from './shuffle_array.js';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore(alternative) {
    this.props.updateScore(alternative);
  }

  render() {
    let scen = this.props.scen;
    return (
        <p className="intro">
          { scen.intro }
        </p>
        <ul className="alternatives">
          {
            shuffleArray(scen.alternatives).map( (alt, index) =>
              <Alternative key={ index } config={ alt } choiceMade={ this.updateScore } />
            )
          }
        </ul>
      </div>
    )
  }
}

export default Scenario;
