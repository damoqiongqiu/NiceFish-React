import * as React from 'react';
import Header from '../components/header';
import {HashRouter as Router,Redirect} from 'react-router-dom';
import Home from './home';


export interface IAppProps {
}

export interface IAppState {
}
function App(){
    return (
        <div>
          <Router>
                <Header/>
                <Home/>
          </Router>
        </div>
    )
}
export default App