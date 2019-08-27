import React from 'react';

const Person = ({ persons, handleDelete }) => {
	return (
		<div>
			{persons.map(person => (
				<p key={person.id}>
					{person.name} {person.number}
					<button onClick={() => handleDelete(person.id)}>Delete</button>
				</p>
			))}
		</div>
	);
};

export default Person;
