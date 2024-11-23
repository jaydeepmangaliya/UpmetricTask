import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { successToast, unsuccessToast } from '../Toast';
import { ToastContainer } from 'react-toastify';



function Reset() {

    const navigate = useNavigate()

    
     const [logindata,setlogindata] =useState({ 
        
        email:"",
      
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
  
 
  
  const {email} = logindata
  

  if(!email ){ 

    
      return unsuccessToast("Enter emial...")
  }
   
   try{ 
    const apiurl ="http://localhost:8000/auth/resetpassword"
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

    const { message,error} = result 
    if(message){ 
        successToast(message)
        setTimeout(()=>{ 
            navigate('/Login')
        },1000)
    }
    
    else if (error){ 
        const detailServer = error?.details?.[0]?.message; 
       
        unsuccessToast(detailServer)
    }
    else if (!message){ 
        unsuccessToast(message)
    }
   }
   
   catch (err){ 
     unsuccessToast(err)
   }
}

  return (
    <div className='container'>
        <h1>Reset Password</h1>
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
           
            <button type='submit'>Reset</button>
            <span>Alredy have an account ? <Link to='/Login'>Login</Link></span>
           
           
        </form>
        <ToastContainer />
    </div>
    
  )
}

export default Reset
