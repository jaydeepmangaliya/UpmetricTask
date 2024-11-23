import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { successToast, unsuccessToast } from '../Toast';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'


function Signup() {

    const navigate = useNavigate()

    
     const [signupdata,setsignupdata] =useState({ 
        name:"",
        email:"",
        password:""
     })


// for input change

const handelchange = (e)=>{ 
      const {name,value} = e.target;
      console.log(name,value)

      const copySignupInfo ={ ...signupdata} 
      copySignupInfo[name] =value
      setsignupdata(copySignupInfo) 
}
console.log("signupinfo ->" , signupdata)


const handelsubmition  = async(e)=>{ 
  e.preventDefault();
  
 
  
  const {name,email,password} = signupdata
  

  if(!name || !email || !password){ 

 
      return unsuccessToast("fill all details...")
  }
   
   try{ 
    const apiurl ="http://localhost:8000/auth/signup"
    const reponce =await fetch(apiurl,{ 
        method:'POST',
        headers:{ 
            'Content-Type':'application/json'
        },
        body:JSON.stringify(signupdata)
        
        
    });
    const result =await reponce.json();
    console.log(result)
    const {success , message,error} = result
    if(success){ 
        successToast(message)
        setTimeout(()=>{ 
            navigate('/Login')
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
        <h1>Signup</h1>
        <form onSubmit={handelsubmition}>
            {/* /for name */}
            <div>
                <label htmlFor='name'>Name</label>
                <input 
                onChange={handelchange} 
                type="text"
                name='name'
                autoFocus
                placeholder='Enter name...'
                value={signupdata.name}
                 />
            </div>
            {/* for email */}
            <div>

                <label htmlFor='email'>Email</label>
                <input  onChange={handelchange}              
                type="email"
                name='email'
                placeholder='Enter email...'
                value={signupdata.email}
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
                value={signupdata.password}
                 />
            </div>
            <button type='submit'>Create Account</button>
            <span>Alredy have an account ? <Link to='/Login'>Login</Link></span>
           
        </form>
        <ToastContainer />
    </div>
    
  )
}

export default Signup
