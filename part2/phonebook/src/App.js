import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personService from './services/persons';
import './index.css'

const Notification = ({message}) => {
	
	if (message === undefined || message.text === '') {
		return null
	}
	return (
		<div className={message.msgType}>
			{message.text}
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');
	const [message, setMessage] = useState({text:'', msgType:''})

	useEffect(() => {
		personService.getAll().then(initialPersons => setPersons(initialPersons));
	}, []);

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
			var updateConfirm = window.confirm(
				`${
					found.name
				} is already added to phonebook, replace the old number with a new one?`
			);
			if (!updateConfirm) {
				return;
			}
			const updatePerson = {
				...found,
				number: newNumber
			};
			personService.update(found.id, updatePerson).then(returnedPerson => {
				setMessage({
					text:`Updated ${newName}`,
					msgType: 'success'
				})
				setTimeout(()=>{
					setMessage({text:'', msgType: ''})
				},5000)
				var copyPerson = [...persons];
				var idx = copyPerson.findIndex(person => person.id === found.id);
				copyPerson[idx].number = newNumber;
				setPersons(copyPerson);
				setNewName('');
				setNewNumber('');
			}).catch(error => {
				setMessage({
					text:`Information of ${newName} has already been removed from server`,
					msgType: 'error'
				})
				setTimeout(()=>{
					setMessage({text:'', msgType: ''})
				},5000)
			});
			return;
		}
		const newPerson = {
			name: newName,
			number: newNumber
		};
		personService.create(newPerson).then(returnedPerson => {
			setMessage({
				text:`Added ${newName}`,
				msgType: 'success'
			})			
			setTimeout(()=>{
				setMessage({text:'', msgType: ''})
			},5000)
			setPersons(persons.concat(returnedPerson));
			setNewName('');
			setNewNumber('');
		});
		
	};

	const handleDelete = id => {
		const person = persons.find(person => person.id === id);
		var delConfirm = window.confirm(`Delete ${person.name} ?`);
		if (delConfirm) {
			personService.delObject(id).then(returnedPerson => {
				setMessage({
					text:`Deleted ${person.name}`,
					msgType: 'success'
				})
				setTimeout(()=>{
					setMessage({text:'', msgType: ''})
				},5000)
				setPersons(persons.filter(person => person.id !== id));
			})
		}
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
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
			<Person persons={personToShow} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
