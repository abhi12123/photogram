//modules
import axios from 'axios';
import React,{ useState} from 'react';

const Login = () => {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState();
    const [alert,setAlert] = useState();
    const [email,setEmail] = useState();
    const [viewforgotpassword,setViewforgotpassword] = useState(false);
    const [passwordresetlink,setPasswordresetlink] = useState();

    const login = async() => {
        if (!(username&&password)){
            setAlert('Enter All Fields and try again');
            return true;
        }
        await axios.post('http://localhost:3005/login',{username,password}).then(res=>{
            setAlert(res.data.alert);
            if(res.data.isLogged){
                window.location.href = '/';
            }
        })
    }

    const forgotpassword = () => {
        setViewforgotpassword(true)
    }

    const getpasswordresetlink = () => {
        if(!email){
            setAlert('enter the email');
            return true
        }
        setAlert();
        axios.post('http://localhost:3005/login/passwordresetlink',{email}).then(res=>setPasswordresetlink(res.data))
    }
    
    return(
        <div className='container'>
            <div className="login">
                <h1>Login</h1>
                <input type='text' placeholder='Username' name='username' onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type='password' placeholder='Password' name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={login}>Login</button>
                <a href="#" onClick={forgotpassword}>Forgot Password ?</a>
                <p className='alert'>{alert}</p>
            </div>
            {
                viewforgotpassword ? 
                <div>
                    <input type='text' placeholder='Email' name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <button onClick={getpasswordresetlink}>Send password reset link</button>
                    {
                        passwordresetlink ?
                            passwordresetlink.mailexists ?
                                <a href={passwordresetlink.link}>--Redirect to inbox--</a>:''
                            :<p>Mail do not exist</p>
                    }
                </div> : 
                ''
            }
        </div>
    )
}

export default Login;