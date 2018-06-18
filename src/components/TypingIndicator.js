import React from 'react';

class TypingIndicator extends React.Component {
	render() {
		if (this.props.usersWhoAreTyping.length > 0) {
			return(
				<div>
				{`${this.props.usersWhoAreTyping
				.slice(0, 2)
				.join(' and ')} is typing`}
				</div>
			);
		}
		return <div />
	}
}

export default TypingIndicator


// if (this.props.usersWhoAreTyping.length === 1) {
// 	return <p>{this.props.usersWhoAreTyping[0]} is typing... </p>
// } else if (this.props.usersWhoAreTyping.length > 1) {
// 	return <p>{this.props.usersWhoAreTyping.join(' and ')} are typing... </p>
// } else {
// 	return <div />
// }
