import React, {Component} from 'react'

import './SearchPanel.css'

export default class SearchPanel extends Component {

	state = {
		term: ''
	}

	onSearchChange = (e) => {
		const term = e.target.value
		this.setState({ term })
		this.props.onSearchChange(term)
	}

	render() {
		return (
			<input 
				className="SearchPanel_input ds-input form-control"
				type="text" 
				placeholder='Type here to search'
				disabled={false}
				value={this.state.term}
				onChange={this.onSearchChange}
			/>
		)
	}
}