import React, { Component } from 'react';
import Alternative from './Alternative.js';

class Scenario extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="scenario">
        <p className="intro">
          { this.props.intro }
        </p>
        <ul className="alternatives">
          { this.props.alternatives.map( alt => <Alternative key={ alt.id } config={ alt.config } /> ) }
        </ul>
      </div>
    )
  }
}

export default Scenario;
