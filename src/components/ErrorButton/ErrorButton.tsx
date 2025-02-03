import { Component } from 'react';

class ErrorButton extends Component {
  state = { shouldThrowError: false };

  handleClick = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Test error after button click');
    }

    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}

export default ErrorButton;
