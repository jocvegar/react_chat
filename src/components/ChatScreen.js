import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingIndicator from './TypingIndicator';
import WhosOnlineList from './WhoIsOnline';

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
		  instanceLocator: 'v1:us1:e00ca932-e9eb-4bc3-977e-6fe565d22222',
		  userId: this.props.currentUsername,
		  tokenProvider: new TokenProvider({ url: 'http://localhost:3001/authenticate' }),
		});

		chatManager
			.connect()
		 	.then(currentUser => {
		 		this.setState({currentUser})
		    // console.log('Successful connection', currentUser)
		   		return currentUser.subscribeToRoom({
		    		roomId: 9709974,
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
		    			},
		    			onUserCameOnline: (user) => {
		    			  console.log(`User ${user.name} came online`)
							this.forceUpdate()
		    			},
		    			onUserWentOffline: (user) => {
		    			  console.log(`User ${user.name} went offline`)
		    			  this.forceUpdate()
		    			},
		    			onUserJoinedRoom: () => {
		    				this.forceUpdate()
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
			<div className="wrapper">
				{/*<header className="header">
									<h2>Aragán</h2>
								</header>*/}
				<div className="chat-wrapper">
					<aside className="who-is-online-wrapper">
						<WhosOnlineList
							users={this.state.currentRoom.users}
							currentUser={this.state.currentUser} />
					</aside>
					<section className="chat-list-wrapper">
						<MessageList messages={this.state.messages} />
						<TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping}/>
						<SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
					</section>
				</div>
			</div>
		);
	}
}

export default ChatScreen

/* <p>{JSON.stringify(this.state.usersWhoAreTyping)}</p> */

// <div className="wrapper">
// 	<div className="chat-wrapper">
// 		<aside className="who-is-online-wrapper">
// 			<h2>Who's online</h2>
// 			<WhoIsOnline users={this.state.currentRoom.users} />
// 		</aside>
// 	</div>
// 	<div className="message-list-wrapper">
// 		<div className="message-wrapper">
// 			<MessageList messages={this.state.messages} />
// 		</div>
// 		<TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping}/>
// 		<SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
// 	</div>
// </div>
