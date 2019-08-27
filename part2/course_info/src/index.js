import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
};

const Content = props => {
	return (
		<div>
			{props.parts.map(part => (
				<Part key={part.id} part={part.name} exercises={part.exercises} />
			))}
		</div>
	);
};

const Part = props => {
	return (
		<div>
			<p>
				{props.part} {props.exercises}
			</p>
		</div>
	);
};

const Total = props => {
	const total = props.parts.reduce((s, p) => s + p.exercises, 0);
	return (
		<div>
			<b>total of {total} exercises</b>
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

const App = () => {
	const courses = [
		{
			name: 'Half Stack application development',
			id: 1,
			parts: [
				{ name: 'Fundamentals of React', exercises: 10, id: 1 },
				{ name: 'Using props to pass data', exercises: 7, id: 2 },
				{ name: 'State of a component', exercises: 14, id: 3 },
				{ name: 'Redux', exercises: 11, id: 4 }
			]
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{ name: 'Routing', exercises: 3, id: 1 },
				{ name: 'Middlewares', exercises: 7, id: 2 }
			]
		}
	];

	return (
		<div>
			{courses.map(course => (
				<Course key={course.id} course={course} />
			))}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
