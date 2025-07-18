import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
        const[credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
          const navigate = useNavigate();
            const handleSubmit = async(e) => {
            e.preventDefault();
            if (credentials.password !== credentials.cpassword) {
  props.showAlert("Passwords do not match", "danger");
  return;
}

            //API Call
            const { name, email, password } = credentials;
            const response = await fetch("http://localhost:4000/api/auth/createuser", {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password}),
        });
        const json = await response.json();
        console.log(json);
       if(json.success){
    localStorage.setItem('token',json.authtoken);
    navigate('/');
    props.showAlert("Account created successfully", "success");
}
else{
            props.showAlert("Invalid Credentials","danger");
        }
            }

        const onChange=(e)=>{
                setCredentials({...credentials,[e.target.name] : e.target.value})
            }

  return (
    <div>
        <h2 className='my-3'>Create an account to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Enter your name</label>
                <input type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
                        <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={8} required/>
            </div>
             <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={8} required/>
            </div>
        
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>

  )
}

export default Signup
