import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { successToast, unsuccessToast } from '../Toast';
import { ToastContainer } from 'react-toastify';






function ResetPassword() {

    const navigate = useNavigate()
    const {id,token} = useParams();

   
     const [logindata,setlogindata] =useState({ 
        
        password:"",
      
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
  
 
  
  const {password} = logindata
  

  if(!password ){ 

   
      return unsuccessToast("Enter emial...")
  }

   try{ 
    const apiurl =`http://localhost:8000/auth/reset-password/${id}/${token}`
    const reponce =await fetch(apiurl,{ 
        method:'POST',
        headers:{ 
            'Content-Type':'application/json'
        },
        body:JSON.stringify({password:password})
        
        
    });
    const result =await reponce.json();
    console.log(result);

    localStorage.setItem('token', result.token);

    const {  message,error} = result 
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
        <h1>Reset Password</h1>
        <form onSubmit={handelsubmition}>
          
           
            {/* for email */}
            <div>

                <label htmlFor='password'>New Password</label>
                <input  onChange={handelchange} 
                type="password"
                name='password'
                placeholder='Enter new  password...'
                value={logindata.password}
                 />
            </div>
            {/* form password */}
           
            <button type='submit'>Update</button>
            <span>Alredy have an account ? <Link to='/Login'>Login</Link></span>
           
           
        </form>
        <ToastContainer />
    </div>
    
  )
}

export default ResetPassword
