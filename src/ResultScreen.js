import React, { Component } from 'react';

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
		return this.props.age;
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
		let range = 71-57;
		let pos = 57 + range * (this.props.geo / 100.0);

		return "" + pos + ". breddegrad";
	}

	edu() {
		let edu = this.props.edu;
		if (edu < 10) {
			return "utdanning på barneskolenivå";
		} else if (edu < 30) {
			return "fagbrev";
		} else if (edu < 50) {
			return "bachelor fra Oslomet";
		} else if (edu < 70) {
			return "bachelor fra Blindern";
		} else if (edu < 90) {
			return "mastergrad";
		} else {
			return "minst én doktorgrad"
		}
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
			<Result key="2" variable={ this.sex() } />,
			<Result key="3" prefix="fra " variable={ this.geo() } />,
			<Result key="4" prefix="med " variable={ this.edu() } />
		]
		return(
			<div className="ResultScreen">
				<p>Du banner som en { results }.</p>
			</div>
		);
	}
}

export default ResultScreen;
