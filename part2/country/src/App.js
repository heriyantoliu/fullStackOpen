import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListCountry from './components/ListCountry';

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
