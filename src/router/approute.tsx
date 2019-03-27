
import * as React from 'react';
import PostList from '../components/post-list';
import {HashRouter as Router,Link, Route,Switch} from 'react-router-dom';
const routes = [
    {
        path:'/',
        component: PostList,
        exact:true,
    },
]
function AppRoute(){
    function RouteGen(route:any){
        return (
            <Route path={route.path} component={route.component} exact={route.exact}/>
        )
      }
   return (
       <div>
           <Router>
             <Switch>
               {
                   routes.map((route,index)=>{
                      return <RouteGen key={index} {...route}/>
                   })
               }
               <Route exact path='/' component={PostList}/>
               
     
             </Switch>
           </Router>
       </div>
   )
}
export default AppRoute