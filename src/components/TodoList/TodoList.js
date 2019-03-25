import React from 'react'
import TodoListItem from './TodoListItem/TodoListItem';

import './TodoList.css'

const TodoList = ({ 
	todos, 
	onDeleted, 
	onToggleImportant,
	onToggleDone }) => {

	const elements = todos.map((item) => {

		const { id, ...itemsProps } = item

		return (
			<li key={id} className="list-group-item">
				<TodoListItem 
					{ ...itemsProps } 
					onDeleted={ () => onDeleted(id) }
					onToggleImportant={() => onToggleImportant(id)}
					onToggleDone={() => onToggleDone(id)}
				/>
			</li>
		)
	})

	return (
		<ul className="list-group TodoList">
			{ elements }
		</ul>
	)
}

export default TodoList