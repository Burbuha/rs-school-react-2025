import React, { Component, ReactNode } from 'react';

interface State {
  hasError: boolean;
  errorMessage: string;
  errorInfo?: string | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in ErrorBoundary: ', error);
    console.error('Error information: ', errorInfo);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      errorMessage: '',
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong!</h1>
          <p>{this.state.errorMessage}</p>
          {this.state.errorInfo && (
            <details>
              <summary>Click to view error details</summary>
              <pre>{this.state.errorInfo}</pre>
            </details>
          )}
          <button onClick={this.handleRetry}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
