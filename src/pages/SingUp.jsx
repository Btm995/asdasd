import{ useState } from "react";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import {Link} from "react-router-dom";
import OAuth from "../components/OAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SingUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState ({
    name: "",
email: "",
password: "",

  });
  const {name, email, password } = formData;
  function onChange(e){
setFormData((prevState)=>({
  ...prevState,
  [e.target.id]: e.target.value,
}))
  }
  async function OnSubmit(e){
    e.preventDefault()
    
    try {
      const auth = getAuth()
      const userCredential = await
       createUserWithEmailAndPassword
      (auth, 
        email,
         password);
         updateProfile(auth.currentUser, {
          displayName: name,
         })
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp
      ();

await setDoc(doc(db, "users", user.uid ), 
formDataCopy)
    } catch (error) {
     console.log (error);
    }
      
    }

  return (
    <section>
      <h1 className= "text-3xl text-center mt-6 font-bold">Sing In</h1>
    
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <div className ="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
        <img src= "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80"
        alt="key"
        className="w-full rounded-2xl"
        ></img>
      </div>
      <div className="w-full md:w-[67%] lg:w-[-40] lg:ml-20">
        <form onSubmit={onSubmit}>
          <input 
          type="email" 
          id="email"
          value={email} 
          onChange={onChange}
          placeholder="Email address"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
          rounded transition ease-in-out"
          />
          <div className="relative mb-6" >
          
            <input 
          type={showPassword ? "text" : "password"}
          id="password"
          value={password} 
          onChange={onChange}
          placeholder="Password"
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
          rounded transition ease-in-out"
          />
          {showPassword ? 
            <AiFillEyeInvisible
            className="absolute right-3 top-3 
            text-xl cursor-pointer" 
            onclick={() => setShowPassword
              ((prevState) => !prevState)}/>
             : <AiFillEye className="absolute right-3 top-3 
            text-xl cursor-pointer"
            onclick={() => setShowPassword
              ((prevState) => !prevState)}/>}
          
          </div>
          <div className="flex justify-between">
            <p>
              Don't have a account ?
              <Link to="/sing-up">Register</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot password ?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>

    </section>
  )
}
