import  App from './containers';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';  
declare var module:any;

ReactDOM.render(<App/>,document.getElementById('root'))

if(module.hot){
    module.hot.accept()
}