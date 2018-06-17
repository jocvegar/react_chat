import React from 'react';

class TypingIndicator extends React.Component {
	render() {
		if (this.props.usersWhoAreTyping.length === 1) {
			return <p>{this.props.usersWhoAreTyping[0]} is typing... </p>
		} else if (this.props.usersWhoAreTyping.length > 1) {
			return <p>{this.props.usersWhoAreTyping.join(' and ')} are typing... </p>
		} else {
			return <div />
		}
	}
}

export default TypingIndicator
