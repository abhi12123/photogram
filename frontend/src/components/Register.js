//modules
import React,{useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [repeatpassword,setRepeatpassword] = useState();
    const [email,setEmail] = useState();
    const [alert,setAlert] = useState();
    
    const register = () => {
        if(!(username && password && repeatpassword && email)){
            setAlert('Enter All Fields and try again');
            return true;
        }
        if(!(password === repeatpassword)){
            setAlert('passwords are not matching');
            return true;
        }
        setAlert();
        axios.post('http://localhost:3005/register',{username,password,email}).then(res=>setAlert(res.data.alert))
    }
    
    return(
        <div className='container'>
            <div className="register">
                <h1>Register</h1>
                <input type='text' placeholder='Username' name='username' onChange={(e)=>setUsername(e.target.value)}/>
                <input type='password' placeholder='Password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <input type='password' placeholder='Repeat Password' name='repeatpassword' onChange={(e)=>setRepeatpassword(e.target.value)}/>
                <input type='text' placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
                <button onClick={register}>Register</button>
                <p className='alert'>{alert}</p>
            </div>
        </div>
    )
}

export default Register;