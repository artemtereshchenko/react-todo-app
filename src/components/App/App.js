import React, {Component} from 'react'

import AppHeader from '../AppHeader/AppHeader'
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter'
import SearchPanel from '../SearchPanel/SearchPanel'
import TodoList from '../TodoList/TodoList'
import TodoAddItem from '../TodoAddItem/TodoAddItem';

import './App.css'

export default class App extends Component { 

	maxId = 100

	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a Lunch')
		],
		term: '',
		filter: 'all' // active, all, done
	} 

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}		
	}

	deleteItem = id => {
		this.setState(({ todoData }) => {
			const index = todoData.findIndex((el) => el.id === id)

			const newTodoData = [
				...todoData.slice(0, index),
				...todoData.slice(index + 1)
			]

			return {
				todoData: newTodoData
			}
		})
	}

	addItem = text => {
		const newItem = this.createTodoItem(text) 

		//	add element in array
		this.setState(({ todoData }) => {
			const newArr = [
				...todoData,
				newItem
			]

			return {
				todoData: newArr
			}
		})
	}

	toggleProperty(arr, id, propName) {
		const index = arr.findIndex((el) => el.id === id)

		const oldItem = arr[index]
		const newItem = { ...oldItem, 
			[propName]: !oldItem[propName]}
		
		return [
		...arr.slice(0, index),
		newItem,
		...arr.slice(index + 1)
		]
	}

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		})
	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		})
	}

	onSearchChange = (term) => {
		this.setState({ term })
	}

	onFilterChange = (filter) => {
		this.setState({ filter })
	}

	search(items, term) {
		if (term.length === 0) {
			return items
		}

		return items.filter((item) => {
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
		})
	}

	filter(items, filter) {
		switch(filter) {
			case 'all':
				return items
			case 'active':
				return items.filter((item) => !item.done)
			case 'done':
				return items.filter((item) => item.done)
			default: 
				return items
		}
	}

	render() {

		const { todoData, term, filter } = this.state

		const visibleItems = this.filter(
			this.search(todoData, term), filter)

		const doneCount = todoData.filter((el) => el.done).length
		const todoCount = todoData.length - doneCount

		return (
			<div className="App">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel 
						onSearchChange={this.onSearchChange}
					/>
					<ItemStatusFilter 
						filter={filter}
						onFilterChange={this.onFilterChange}
					/>
				</div>	
				<div className="TodoList">
					<TodoList 
						todos={visibleItems} 
						onDeleted={ this.deleteItem }
						onToggleImportant={this.onToggleImportant}
						onToggleDone={this.onToggleDone}
					/>
				</div>
				<TodoAddItem
					onAddItem={this.addItem}
				/>
			</div>
		)
	}
}