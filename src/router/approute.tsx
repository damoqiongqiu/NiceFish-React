
import * as React from 'react';
import PostList from '../components/post-list';
import {RouteWithSubRoutes} from '../containers/index'
import {Switch} from 'react-router-dom';
const routes = [
    {
        path:'/post',
        component: PostList,
    },
    {
        path:'/home',
        component: PostList,
    }
]
 
function AppRoute(){
   return (
       <div> 
               <Switch>
                 {
                           routes.map((route,index)=>{
                              return <RouteWithSubRoutes key={index} {...route}/>
                           })    
                   }  
               </Switch>
       </div>
   )
}
export default AppRoute