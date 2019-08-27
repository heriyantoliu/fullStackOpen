import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Country = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h2>Languages:</h2>
			<ul>
				{country.languages.map(language => (
					<li key={language.iso639_1}>{language.nativeName}</li>
				))}
			</ul>
			<img src={country.flag} height='100' width='100' />
		</div>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [find, setFind] = useState('');
	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			setCountries(response.data);
		});
	}, []);

	const countriesDisplay =
		find === ''
			? countries
			: countries.filter(country =>
					country.name.toLowerCase().match(find.toLowerCase())
			  );

	const handleFind = event => {
		setFind(event.target.value);
	};

	return (
		<div>
			find countries <input value={find} onChange={handleFind} />
			<br />
			<ListCountry countries={countriesDisplay} showCountry={setFind} />
		</div>
	);
};

export default App;
