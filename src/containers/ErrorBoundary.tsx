import React, { Component } from 'react';
import { Button } from 'antd';
interface IErrorBoundaryProps {
  children: React.ReactNode;
}
export default class ErrorBoundary extends Component<IErrorBoundaryProps> {
  state = { hasError: false };
  constructor(props: IErrorBoundaryProps) {
    super(props);
  }
  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }
  // componentDidCatch(error: any) {
  // 你同样可以将错误志上报给服务器
  // this.setState({ hasError: true });
  // }
  reload() {
    window.location.reload();
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="loading-container d-flex align-items-center justify-content-center">
            不好意思，程序出错了。请
            <Button className="ml-5px" onClick={this.reload}>
              重新加载
            </Button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
