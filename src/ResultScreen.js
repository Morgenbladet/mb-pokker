import React, { Component } from 'react';
import shuffleArray from './shuffle_array.js';
import geo_definitions from './geo_definitions.json';
import edu_defs from './edu_definitions.json';
import navn from './navn.csv';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

class ResultScreen extends Component {
	constructor(props) {
		super(props);

		this.age = this.age.bind(this);
		this.sex = this.sex.bind(this);
		this.geo = this.geo.bind(this);
		this.edu = this.edu.bind(this);

		this.normalise_age = this.normalise_age.bind(this);
		this.normalise_sex = this.normalise_sex.bind(this);
		this.normaliseGeo = this.normalise_geo.bind(this);
		this.normalise_edu = this.normalise_edu.bind(this);
		this.getName = this.getName.bind(this);
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

  componentDidMount() {
    scrollIntoViewIfNeeded(document.getElementById("Apptop"), { duration: 100 });
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
			return "en kjønnsløs robot";
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

  normalise_geo() {
    let geo = Math.round(this.props.geo / 10.0);
    switch(geo) {
      case 0:
        return("Sørlandet");
      case 1:
      case 2:
        return("Rogaland");
      case 3:
        return("Oslo");
      case 4:
        return("Østfold");
      case 5:
        return("Innlandet");
      case 6:
      case 7:
        return("Bergen");
      case 8:
        return("Nordre vestlandet");
      case 9:
        return("Trøndelag");
      case 10:
      default:
        return("Nord-Norge");
    }
  }

  normalise_edu() {
    if (this.props.edu > 40) {
      return("Høy");
    } else {
      return("Lav");
    }
  }

  normalise_sex() {
    if (this.props.sex < 50) {
      return("M");
    } else {
      return("K");
    }
  }

  normalise_age() {
    if (this.props.age > 40) {
      return("Gammel");
    } else {
      return("Ung");
    }
  }
    
  getName() {
    let region = this.normalise_geo();
    let stat = this.normalise_edu();
    let sex = this.normalise_sex();
    let age_group = this.normalise_age();

    let chosen = navn.find((candidate) =>
      candidate.Region === region &&
        candidate.Status === stat &&
        candidate.Kjønn === sex &&
        candidate.Alder === age_group
    );

    return(chosen.Navn);
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
        <h1>Du ble { this.getName() }</h1>
				<p>Du banner som en { results }</p>
        <hr/>
        <p>Gratulerer! Nå har banningen fortalt deg hvem du er – i tilfelle du ikke visste det fra før. Slik har vi kommet frem til resultatet:</p>
        <p>Bannetesten bruker data fra banneforskningen til å beregne kjønn, og her er det tydelige forskjeller. Grovt sett kan vi si at menn banner grovere enn kvinner. De bruker flere kjønnsuttrykk og har lettere for å ty til det vi gjerne oppfatter som stygge ord, slik som <em>faen</em> og <em>helvete</em>. Kvinner, derimot, velger oftere <em>herregud</em>, <em>gudameg</em> og andre ord som jevnt over oppfattes mildere. Testen prøver å speile dette.</p>
        <p>Menn har også lettere for å forbanne andre (faen ta deg!), mens kvinner har lettere for å forbanne seg selv: (faen, så dum jeg var!)</p>
        <p>Når det gjelder geografisk plassering, tar spillet utgangspunkt i ord og uttrykk som er knyttet til bestemte landsdeler for å si noe om hvor i landet du bor – eventuelt hvor du burde flytte? Til slutt har vi beregnet alder ut fra ordvalg. Så hvis du i fullt alvor sier <em>fordømt</em> og <em>nei, gosh!</em>, ja, da vet vi at du ikke er 20 år.</p>
			</div>
		);
	}
}

export default ResultScreen;
