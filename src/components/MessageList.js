import React, { Component } from 'react';

class MessageList extends Component {
	render() {
		const styles = {
			senderUsername: {
		  		fontWeight: 'bold',
			},
			message: {
				fontSize: 15
			},
		}

		return(
			<div className="message-list-wrapper">
				<ul id="message-list">
					{this.props.messages.map((message, index) => (
						<li key={index} className="message-item">
							<div>
								<span style={styles.senderUsername}>{message.senderId}</span>{' '}
							</div>
							<p style={styles.message}>{message.text}</p>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default MessageList
