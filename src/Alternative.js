import React, { Component } from 'react';

class Alternative extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.choiceMade(this.props.config);
  }

  render() {
    return(
      <li>
        <button className="alternative" onClick={ this.handleClick }>
          { this.props.config.text }
        </button>
      </li>
    );
  }
}

export default Alternative;
