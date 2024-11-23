import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { successToast, unsuccessToast } from '../Toast';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'


function LoginPage() {

    const navigate = useNavigate()

   
     const [logindata,setlogindata] =useState({ 
        
        email:"",
        password:""
     })




const handelchange = (e)=>{ 
      const {name,value} = e.target;
      console.log(name,value)

      const copyLoginInfo ={ ...logindata}  
      copyLoginInfo[name] =value
      setlogindata(copyLoginInfo) 
}
console.log("Login  ->" , logindata)


const handelsubmition  = async(e)=>{ 
  e.preventDefault();
  
 
  
  const {email,password} = logindata
  

  if(!email || !password){ 

    
      return unsuccessToast("fill all details...")
  }
  
   try{ 
    const apiurl ="http://localhost:8000/auth/login"
    const reponce =await fetch(apiurl,{ 
        method:'POST',
        headers:{ 
            'Content-Type':'application/json'
        },
        body:JSON.stringify(logindata)
        
        
    });
    const result =await reponce.json();
    console.log(result);

    localStorage.setItem('token', result.token);

    const {success , message,error} = result 
    if(success){ 
        successToast(message)
        setTimeout(()=>{ 
            navigate('/Home')
        },1000)
    }
    
    else if (error){ 
        const detailServer = error?.details?.[0]?.message; 
       
        unsuccessToast(detailServer)
    }
    else if (!success){ 
        unsuccessToast(message)
    }
   }
   
   
   catch (err){ 
     unsuccessToast(err)
   }
  

}

  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handelsubmition}>
          
           
            {/* for email */}
            <div>

                <label htmlFor='email'>Email</label>
                <input  onChange={handelchange}             
                type="email"
                name='email'
                placeholder='Enter email...'
                value={logindata.email}
                 />
            </div>
            {/* form password */}
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                onChange={handelchange} 
                type="password"
                name='password'
                placeholder='Enter password...'
                value={logindata.password}
                 />
            </div>
            <button type='submit'>Login</button>
            <span>Don't have account? <Link to='/Signup'>Signup</Link></span>
            <span>Reset Password? <Link to='/Reset'>Resett</Link></span>
           
        </form>
        <ToastContainer />
    </div>
    
  )
}

export default LoginPage
