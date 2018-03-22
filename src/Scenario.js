import React, { Component } from 'react';
import Alternative from './Alternative.js';
import './Scenario.css';
import shuffleArray from './shuffle_array.js';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    scrollIntoViewIfNeeded(document.getElementById("Apptop"), { duration: 100 });
  }

  updateScore(alternative) {
    this.props.updateScore(alternative);
  }

  render() {
    let scen = this.props.scen;
    return (
      <div className="Scenario">
        <p className="image">
          <img src={this.props.image.image} alt={this.props.image.alt} />
        </p>
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
        <div className="photo-credit">
          Illustrasjon: {this.props.image.credit}
        </div>
      </div>
    )
  }
}

export default Scenario;
