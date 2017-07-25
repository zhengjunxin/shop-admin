import React, { Component } from 'react';
import './index.css';
import axios from 'axios'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
        </p>
			</div>
		);
	}
	componentDidMount() {
		axios.get('/list')
			.then(res => {
				console.log('-list-', res)
			})
			.catch(err => {
				console.log(err)
			})
		fetch('/list')
			.then(res => res.json())
			.then(res => {
				console.log('-', res)
			})
	}
}

export default App;
