import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
function Signup() {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=formData
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
      const userCredential=await createUserWithEmailAndPassword(auth,email,password)
      const user=userCredential.user
      updateProfile(auth.currentUser,{
        displayName:name,
      })
      const formDataCopy={...formData}
      delete formDataCopy.password 
      formDataCopy.timestamp=serverTimestamp()
      await setDoc(doc(db,'users',user.uid),formDataCopy)
      navigate('/')
    } catch (error) {
      toast.error('Registeration failed.  Please check the fields and try again')
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
          type="text"
          className="nameInput"
          placeholder='Name'
          value={name}
          onChange={onChange}
          id='name'
          />
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
          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        <Link to='/sign-in' className="registerLink">Sign In instead</Link>
        <OAuth/>
      </div>
      </>
    );
  }
  
  
  
export default Signup;
  