import React, { Component } from 'react';

export default class ErrorBoundary extends Component{
    state:any;
    constructor(props:any) {
        super(props);
        this.state = { hasError: false };
    }
    // static getDerivedStateFromError(error:any) {
    //     // 更新 state 使下一次渲染能够显示降级后的 UI
    //     return { hasError: true };
    //   }
      componentDidCatch(error:any) {
        // 你同样可以将错误志上报给服务器
        // console.log(error)
         this.setState({hasError:true})
      }
      render(){
          if(this.state.hasError){
              return <>someThing went wrong</>
          }
          return this.props.children
      }
    
}
