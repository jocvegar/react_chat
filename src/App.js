import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			currentScreen: 'WhatIsYourUsernameScreen',
			currentUsername: '',

		}

		this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
	}

	onUsernameSubmitted(username) {
		fetch('http://localhost:3001/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username})
		}).then(response => {
			// console.log(username);
			this.setState({
				currentUsername: username,
				currentScreen: 'ChatScreen',
			})
		}).catch(error => {
			console.log(error);
		})
	}

	render() {
		if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
			return <UsernameForm onSubmit={this.onUsernameSubmitted} />
		} else if (this.state.currentScreen === 'ChatScreen') {
			return <ChatScreen currentUsername={this.state.currentUsername} />
		}
	}
}

export default App
