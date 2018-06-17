import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';

class ChatScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			currentUser: {},
			currentRoom: {},
			usersWhoAreTyping: [],
		}

		this.sendMessage = this.sendMessage.bind(this)
		this.sendTypingEvent = this.sendTypingEvent.bind(this)
	}

	componentDidMount() {
		const chatManager = new ChatManager({
		  instanceLocator: 'v1:us1:5546b511-0858-41f6-9711-4967ef9b60c3',
		  userId: this.props.currentUsername,
		  tokenProvider: new TokenProvider({ url: 'http://localhost:3001/authenticate' }),
		});

		chatManager
			.connect()
		 	.then(currentUser => {
		 		this.setState({currentUser})
		    // console.log('Successful connection', currentUser)
		   		return currentUser.subscribeToRoom({
		    		roomId: 9685255,
		    		messageLimit: 100,
		    		hooks: {
		    			onNewMessage: message => {
		    				this.setState({
		    					messages: [...this.state.messages, message],
		    				})
		    			},
		    			onUserStartedTyping: user => {
		    			  // console.log(`User ${user.name} started typing`)
		    				this.setState({
		    					usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
		    				})
		    			},
		    			onUserStoppedTyping: user => {
		    			  // console.log(`User ${user.name} stopped typing`)
		    			  this.setState({
		    			  	usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
		    			  		username => username !== user.name)
		    			  })
		    			}
		    		},
		  		})
		  	})
	  		.then(currentRoom => {
	  			this.setState({currentRoom})
	  		})
	  	  	.catch(err => { console.log('Error on connection', err) })
	}

	sendMessage(text) {
		this.state.currentUser.sendMessage({
			roomId: this.state.currentRoom.id,
			text
		})
	}

	sendTypingEvent() {
		this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id })
			.catch(err => {
				console.log(`Error sending typing indicator: ${err}`)
			})
	}

	render() {
		return(
			<div>
				<h1>Chat</h1>
				<p>Hello, {this.props.currentUsername}</p>
				<MessageList messages={this.state.messages} />
				<TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping}/>
				<SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
			</div>
		);
	}
}

export default ChatScreen

/* <p>{JSON.stringify(this.state.usersWhoAreTyping)}</p> */
