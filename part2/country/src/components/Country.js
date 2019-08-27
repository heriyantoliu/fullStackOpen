import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		axios
			.get('https://api.apixu.com/v1/current.json?key=&q=' + country.capital)
			.then(response => {
				setWeather(response.data);
			});
	}, []);
	if (!weather.current) return null;

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
			<h2>Weather in {country.capital}</h2>
			<p>
				<b>temperature: </b> {weather.current.temp_c} Celcius
			</p>
			<img src={`https:${weather.current.condition.icon}`} />
			<p>
				<b>wind: </b>
				{weather.current.wind_kph} direction {weather.current.wind_dir}
			</p>
		</div>
	);
};

export default Country;
