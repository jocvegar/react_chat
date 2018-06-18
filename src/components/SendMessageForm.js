import React, { Component } from 'react';

class SendMessageForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	onChange(e) {
		this.setState({
			text: e.target.value,
		})
		this.props.onChange();
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(this.state.text)
		this.setState({ text: '' })
	}

	render(){
		return(
			<div className="send-message-wrapper">
				<form onSubmit={this.onSubmit} className="form-wrapper">
					<input className="message-input" type="text" placeholder="Say hello" onChange={this.onChange} value={this.state.text}/>
					<input className="message-input" type="submit"/>
				</form>
			</div>
		);
	}
}

export default SendMessageForm
