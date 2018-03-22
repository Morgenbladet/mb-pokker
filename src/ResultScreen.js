import React, { Component } from 'react';
import shuffleArray from './shuffle_array.js';
import geo_definitions from './geo_definitions.json';
import edu_defs from './edu_definitions.json';

class ResultScreen extends Component {
	constructor(props) {
		super(props);

		this.age = this.age.bind(this);
		this.sex = this.sex.bind(this);
		this.geo = this.geo.bind(this);
		this.edu = this.edu.bind(this);
	}

	// Measures the distance between points q and p, where q and p are vectors
	// of coordinates across any number of dimensions. Elements of p and q must
	// be numeric.
	euclidean_distance(p, q) {
		if(! (Array.isArray(p) && Array.isArray(q) && q.length === p.length)) {
			throw Error('Arguments must be arrays of equal length');
		}
		return Math.sqrt(p
			.map((item, i) => (item - q[i])**2)
			.reduce((acc, curr) => acc + curr));
	}

	age() {
		return Math.round(this.props.age);
	}

	sex() {
		let sex = this.props.sex;
		if (sex <= 10) {
			return "mannemann";
		} else if (sex <= 30) {
			return "mann";
		} else if (sex <= 40) {
			return "myk mann";
		} else if (sex <= 60) {
			return "kjønnsløs robot";
		} else {
			return "kvinne";
		}
	}

	geo() {
    let geo = Math.round(this.props.geo / 10.0); //should be in [0,10]
    return shuffleArray(geo_definitions[geo])[0];
	}

	edu() {
		let edu = this.props.edu;
    let alts = null;
		if (edu < 10) {
      alts = edu_defs[0];
		} else if (edu < 30) {
      alts = edu_defs[1];
		} else if (edu < 50) {
      alts = edu_defs[2];
		} else if (edu < 70) {
      alts = edu_defs[3];
		} else if (edu < 90) {
      alts = edu_defs[4];
		} else {
      alts = edu_defs[5];
		}

    return shuffleArray(alts)[0];
	}

	render() {
		function Result(props) {
			return (
				<span>
					{ props.prefix }
					<strong>{ props.variable }</strong>
					{ props.suffix }
					{ ' ' }
				</span>
			);
		}

		let results = [
			<Result key="1" prefix="en " variable={ this.age() } suffix=" år gammel" />,
			<Result key="2" prefix="" variable={ this.edu() } suffix=". "/>,
			<Result key="3" prefix="Du er " variable={ this.sex() } />,
			<Result key="4" prefix="og kommer fra " variable={ this.geo() } suffix="."/>
		]
		return(
			<div className="ResultScreen">
        <h1>Dette er deg</h1>
				<p>Du banner som en { results }</p>
			</div>
		);
	}
}

export default ResultScreen;
