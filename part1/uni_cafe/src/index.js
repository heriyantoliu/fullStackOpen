import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
	if (good + neutral + bad === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<div>
			<Statistic text='Good' value={good} />
			<Statistic text='Neutral' value={neutral} />
			<Statistic text='Bad' value={bad} />
			<Statistic text='All' value={good + neutral + bad} />
			<Statistic text='Average' value={(good - bad) / (good + neutral + bad)} />
			<Statistic
				text='Positive'
				value={(good / (good + neutral + bad)) * 100 + ' %'}
			/>
		</div>
	);
};

const Statistic = ({ text, value }) => {
	return (
		<p>
			{text} {value}
		</p>
	);
};

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

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
			<Button onClick={clickGood} text='Good' />
			<Button onClick={clickNeutral} text='Neutral' />
			<Button onClick={clickBad} text='Bad' />
			<h1>Statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
