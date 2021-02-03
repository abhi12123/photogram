//modules
import React,{useState,useEffect, Fragment} from 'react';
import { BrowserRouter as Router,  Switch,  Route,  Link } from "react-router-dom";
import axios from "axios";
//components
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
//css
import './App.css';

function App() {
  const [session,setSession] = useState({isLogged:false});

  useEffect(()=>{
    axios.get('http://localhost:3005/login/session').then(res=>setSession(res.data));
  },[]);

  const logout = () => {
    axios.get('http://localhost:3005/login/logout');
    window.location.href='/';
  }
  
  return (
    <Router>
      <div className="App">
        <nav>
          <h1><Link to="/">PHOTOGRAM</Link></h1>
          <ul className='navbar-options'>
            {
              session.isLogged ? 
              <Fragment>
                <li onClick={logout}>Logout</li>
                <li><Link to="/Profile">Profile</Link></li>
              </Fragment>:
              <Fragment>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Register">Register</Link></li>
              </Fragment>
            }
          </ul>
        </nav>
      </div>
      <Switch>
          <Route exact path="/"><Home session={session}/></Route>
          <Route path="/Login/resetpassword/:token"><ResetPassword/></Route>
          <Route path="/Login"><Login /></Route>
          <Route path="/Register"><Register /></Route>
          <Route path="/Profile"><Profile session={session}/></Route>
        </Switch>
    </Router>
  );
}

export default App;
