//modules
import React,{ useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const {token} = useParams();
    const [newpassword,setNewpassword] = useState();
    const [alert,setAlert] = useState();

    const resetpassword = () => {
        if(newpassword){
            axios.post('http://localhost:3005/login/passwordreset',{token,newpassword});
            window.location.href = "/";
        }else{
            setAlert('enter the new password')
        }
    }
    
    return(
    <div className='resetpassword'>
        <h1>Reset Password</h1>
        <input type='password' placeholder='New Password' name='newpassword' onChange={(e)=>{setNewpassword(e.target.value)}}/>
        <button onClick={resetpassword}>Reset Password</button>
        <p className='alert'>{alert}</p>
    </div>
    )
}

export default ResetPassword;
