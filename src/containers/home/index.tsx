import * as React from 'react';
import AppRoute from '../../router/approute';
function Home (){
    return (
        <div className="container mt-16px">
           <div className="row">
              <div className="col-md-9">
                 <AppRoute/>
              </div>
              <div className="col-md-3">
              </div>
           </div>
        </div>
    )
}
export default Home