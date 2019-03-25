import React, {Component} from 'react'

import './TodoAddItem.css'

export default class todoAddItem extends Component {

	state = {
		label: ''
	}

	onLabelChange = e => {
		this.setState({
			label: e.target.value
		})
	}

	onSubmit = e => {
		e.preventDefault()
		
		this.props.onAddItem(this.state.label)
		this.setState({
			label: ''
		}) 
	}

	render() {
		return (
			<form 
				className="TodoAddItem"
				onSubmit={this.onSubmit}	
			>
				<div className="d-flex">
					<input 
						type="text"
						className={"form-control"}
						placeholder="What need to be done?"
						onChange={this.onLabelChange}
						value={this.state.label}
					/>
					<button 
						disabled={!this.state.label}
						className={"btn btn-outline-secondary"}
					>
						Add
					</button>				
				</div>
			</form>					
		)
	}
}