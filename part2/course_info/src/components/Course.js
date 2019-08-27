import React from 'react';

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

export default Course;
