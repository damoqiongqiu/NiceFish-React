
import * as React from 'react';
import PostList from '../components/post-list';
import Login from '../components/login';
import {HashRouter as Router,Link, Route,Switch,Redirect} from 'react-router-dom';
const routes = [
    {
        path:'/post',
        component: PostList,
        exact:true,
    },
    {
        path:'/login',
        component: Login,
        exact:false,
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
               <Switch>
                 {
                           routes.map((route,index)=>{
                              return <RouteGen key={index} {...route}/>
                          })
                           
                   }  
               </Switch>
       </div>
   )
}
export default AppRoute