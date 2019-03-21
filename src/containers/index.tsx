import * as React from 'react';
import Header from '../components/header';
import Home from './home'

export interface IAppProps {
}

export interface IAppState {
}
function App(){
    return (
        <div>
          <Header/>
          <Home/>
        </div>
    )
}
export default App