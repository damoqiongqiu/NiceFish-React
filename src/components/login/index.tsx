import * as React from 'react';
import {useState} from 'react';
import {Button} from 'antd';
import './index.scss';
function Login (){
    const [namefill,updatenamefill] = useState('');
    const [pwdfill,updatepwdfill] = useState('');
    const [login,updatelogin] = useState({
        name:'',
        pwd:''
    });
    function onNameBlur(){
      if(login.name.trim()){
          updatenamefill('ui-state-filled');
      }else{
          updatenamefill('')
      }
      if(login.pwd.trim()){
          updatepwdfill('ui-state-filled');
      }else{
          updatepwdfill('')
      }
    }
    function handleChange(value:any){
       const uplogin ={
           ...login,
           ...value
       }
       updatelogin(uplogin)
    }
    return (
        <div className="login-container">
  <div className="container">
    <div className="card login-panel bg-white">
      <div className="col-12 d-flex justify-content-center  text-white">
        <span className="bg-red pd-5-10px font-size-24">魚</span>
      </div>
      <form  >
        <div className="col-12 d-flex  text-white">
          <span className="inputfiled">
            <input className={`col input-text ${namefill}`} type="text" autoComplete="off"  value={login.name} onChange={e => handleChange({name :e.target.value}) } onBlur={()=> onNameBlur()}/>
            <label>Username</label>
           
          </span>
        </div>
        <div className="col-12 d-flex justify-content-center  text-white">
          <span className="inputfiled">
            <input className={`col input-text ${pwdfill}`}  type="password" value={login.pwd} autoComplete="off" onBlur={()=>{onNameBlur()}} onChange={e => handleChange({pwd :e.target.value}) }/>
            <label>Password</label>
          </span>
        </div>
        <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
          <Button type="primary" className="col bg-primary border-color-primary">登录</Button>
        </div>
      </form>
    </div>
  </div>
</div>
    )
}
export default Login