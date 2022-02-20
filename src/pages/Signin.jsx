import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OAuth from '../components/OAuth';
function Signin() {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const {email,password}=formData
  const navigate=useNavigate()
  const onChange=(e)=>{
    setFormData({...formData,
    [e.target.id]:e.target.value
    })
  }

  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
      const auth=getAuth()
      const userCredential=await signInWithEmailAndPassword(auth,email,password)
      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Email or Password is incorrect')
    }
  }

    return (
      <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form onSubmit={onSubmit}> 
          <input
          type="email"
          className="emailInput"
          placeholder='Email'
          value={email}
          onChange={onChange}
          id='email'
          />
          <div className="passwordInputDiv">
            <input type={showPassword?'text': 'password'}
            className='passwordInput'
            placeholder='password'
            id='password'
            value={password}
            onChange={onChange} />
            <img src={visibilityIcon} alt="show password" 
            className='showPassword' onClick={()=>setShowPassword(!showPassword)} />
          </div>
          <Link className='forgotPasswordLink'
          to='/forgot-password' >
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        <Link to='/sign-up' className="registerLink">Sign Up instead</Link>
        <OAuth/>
      </div>
      </>
    );
  }
  
export default Signin;
  