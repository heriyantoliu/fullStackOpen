import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const clickGood = () => {
		setGood(good + 1);
	};

	const clickNeutral = () => {
		setNeutral(neutral + 1);
	};

	const clickBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<button onClick={clickGood}>Good</button>
			<button onClick={clickNeutral}>Neutral</button>
			<button onClick={clickBad}>Bad</button>
			<h1>Statistics</h1>
			<p>Good {good}</p>
			<p>Neutral {neutral}</p>
			<p>Bad {bad}</p>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
