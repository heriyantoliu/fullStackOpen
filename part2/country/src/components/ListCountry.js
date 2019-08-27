import React from 'react';
import Country from './Country';

const ListCountry = ({ countries, showCountry }) => {
	const countriesLength = countries.length;

	if (countriesLength > 10) {
		return <p>Too many matches, specify another filter</p>;
	} else if (countriesLength !== 1) {
		return countries.map(country => (
			<div key={country.name}>
				{country.name}
				<button onClick={() => showCountry(country.name)}>Show</button>
			</div>
		));
	}
	return <Country country={countries[0]} />;
};

export default ListCountry;
