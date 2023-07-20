import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  reload() {
    window.location.reload();
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="loading-container d-flex align-items-center justify-content-center">
            不好意思，程序出错了。请
            {/* <Button className="ml-5px" onClick={this.reload}>
              重新加载
            </Button> */}
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
