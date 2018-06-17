import React from 'react';

class WhoIsOnline extends React.Component {
	render() {
		if (this.props.users) {
			return(
				<ul>
					{this.props.users.map((user, index) => {
						return <li>{user.name} ({user.presence.state})</li>
					})}
				</ul>
			);
		} else {
			return <p>Loading...</p>
		}
	}
}

export default WhoIsOnline
