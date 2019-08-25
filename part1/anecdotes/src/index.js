import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = props => {
	const [selected, setSelected] = useState(0);
	const [points, setPoint] = useState([0, 0, 0, 0, 0, 0]);
	const [mostVote, setMostVote] = useState({
		selected: 0,
		vote: 0
	});

	const nextAnecdote = () => {
		var random = Math.random() * anecdotes.length;
		setSelected(Math.floor(random));
	};

	const addVote = () => {
		const copyPoint = [...points];
		copyPoint[selected] += 1;
		setPoint(copyPoint);
		if (copyPoint[selected] > mostVote.vote) {
			setMostVote({
				selected,
				vote: copyPoint[selected]
			});
		}
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<div>{props.anecdotes[selected]}</div>
			<button onClick={addVote}>Vote</button>
			<button onClick={nextAnecdote}>next anecdote</button>
			<p>has {points[selected]} votes</p>
			<br />
			<h1>Anecdote with most votes</h1>
			<div>{props.anecdotes[mostVote.selected]}</div>
			<p>has {mostVote.vote} votes</p>
		</div>
	);
};

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
