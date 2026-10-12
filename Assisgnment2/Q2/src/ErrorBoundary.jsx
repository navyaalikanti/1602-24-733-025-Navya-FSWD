
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error);
    console.error("Error details:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="box">
          <h2>Something went wrong!</h2>
          <button onClick={this.props.onRetry}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
