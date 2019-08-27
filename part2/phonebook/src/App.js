import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

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
			<Filter handleSearch={handleSearchName} />
			<h3>add a new</h3>
			<PersonForm
				handleSubmit={addPerson}
				newName={newName}
				handleNewName={handleNewName}
				newNumber={newNumber}
				handleNewNumber={handleNewNumber}
			/>
			<h2>Numbers</h2>
			<Person persons={personToShow} />
		</div>
	);
};

export default App;
