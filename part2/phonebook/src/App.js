import React, { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');

	const handleNewName = event => {
		setNewName(event.target.value);
	};

	const handleNewNumber = event => {
		setNewNumber(event.target.value);
	};

	const personToShow =
		searchName === ''
			? persons
			: persons.filter(person =>
					person.name.toLowerCase().match(searchName.toLowerCase())
			  );

	const handleSearchName = event => {
		setSearchName(event.target.value);
	};

	const addPerson = event => {
		event.preventDefault();
		var found = persons.find(person => person.name === newName);
		if (found) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		const newPerson = {
			name: newName,
			number: newNumber
		};
		setPersons(persons.concat(newPerson));
		setNewName('');
		setNewNumber('');
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input onChange={handleSearchName} />
			</div>
			<h2>add a new</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNewName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNewNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{personToShow.map(person => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
