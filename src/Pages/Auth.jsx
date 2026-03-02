import { useContext, useState } from "preact/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const[error,setError] = useState(null)

  const {signUp,user,logout,login}=useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate=useNavigate()
  const onSubmit=(data)=>{
    setError(null)
    let result;
    if (mode=== 'signup'){
        result=signUp(data.email,data.password)
    } else {
        result=login(data.email,data.password)
    }
    
    if(result.success){
    navigate('/')
   }else{
    setError(result.error)
   }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
           {/* {user && <p>Logged In As : {user.email}</p>}
            <button onClick={()=>logout()}>Logout</button> */}
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                {...register("email",{required:"Email is required"})}
                type="email"
                className="form-input"
                id="email"
              />
              {errors.email 
                && (<span className="form-error">{errors.email.message}</span> 
                )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                {...register("password",{
                    required:"Password is required",
                    minLength:{
                        value:6,
                        message:"Value must me atleast 6 characters"
                    },
                    maxLength:{
                        value:12,
                        message:"Value must me atmost 12 characters"
                    }
                    
                })} 
                type="password" 
                className="form-input" 
                id="password" 
                />
                {errors.password 
                && (<span className="form-error">{errors.password.message}</span> 
                )}
            </div>
            {/* {mode?} */}
            <button type="submit" className="btn btn-primary">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === 'signup' ? (
                <p>
                    Already have an account? { " "}
                    <span className="auth-link" onClick={()=>setMode('login')}>Login</span>
                </p>
            ):(
                <p>
                Don't have an account? { " "}
                <span className="auth-link" onClick={()=>setMode('signup')}>Signup</span>
            </p>
            )
        }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
