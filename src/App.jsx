import { useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { IoEye } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";
import Loader from './Components/Loader';


function App() {



  const {register, handleSubmit, formState:{errors}, reset, watch, getValues } = useForm({
    mode: "onTouched"
  });
  const password = watch("password", "");

  const [loading, setLoading] = useState(false);
  const [regError, setRegError] = useState("");



  const onSubmit = async (formData) => {

    try {
      setLoading(true);   
      console.log(formData);
      const res = await axios.post("https://form-handling.onrender.com/api/v1/auth/register", formData)
      console.log(res);
      if (res.status == 201){
        toast.success("Registration Successful")
        reset()
        }
      setLoading(false);   

    } catch (error) {
      setLoading(false);
      console.log(error);
      setRegError(error.response.data.message)
      
    }     
  }

  const [show, setShow] = useState(false)

  const [show2, setShow2] = useState(false)

const toggle = () => {
  setShow(!show)
}

const toggle2 = () => {
  setShow2(!show2)
}


const passTogle = show ? 'text' : 'password';

const passTogle2 = show2 ? 'text' : 'password';
  
      
  return (
    <>
    <Toaster
            position='top-center'
            
            />
      <section>
  <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
      <div className="flex flex-col">
        <div>
          <h2 className="text-4xl text-black">Reset password</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >

      {regError && <p className='text-red-500 font-semibold'>
        {regError}</p>}

        
        {/* <input value="https://jamstacker.studio/thankyou" type="hidden" name="_redirect"/> */}
        <div className="mt-4 space-y-6">

        <div className="col-span-full ">
          <div className='flex flex-row justify-between'>
            <div>
          <label className="block mb-3 text-sm font-medium text-gray-600"> First Name   </label>

            </div>
            <div>
            {errors.firstname && 
              <p className='text-red-500 text-end'>{errors.firstname.message}</p>}

            </div>
            

          </div>
            
            <input {...register("firstname", 
                 {required: " First name is required"
                 })} type="text" placeholder="First Name" className={` ${errors.firstname ? "border-red-500" : ""} block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm`}/>


          </div>



          <div className={`col-span-full ${errors.lastname ? "border-red-500" : ""}`}>
          <div className='flex flex-row justify-between'>
            <div>
          <label className="block mb-3 text-sm font-medium text-gray-600"> Last Name   </label>

            </div>
            <div>
            {errors.lastname && 
              <p className='text-red-500 text-end'>{errors.lastname.message}</p>}

            </div>
            
          </div>
            <input {...register("lastname", 
                 {required: " Last name is required"
                 })} type="text" placeholder="Last Name" className={` ${errors.lastname ? "border-red-500" : ""} block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm`}/>
          </div>






          <div className={`col-span-full ${errors.email ? "border-red-500" : ""}`}>
          <div className='flex flex-row justify-between'>
            <div>
          <label className="block mb-3 text-sm font-medium text-gray-600"> Email </label>

            </div>
            <div>
            {errors.email && 
              <p className='text-red-500 text-end'>{errors.email.message}</p>}

            </div>
            

          </div>
            <input {...register("email",
                 {required: "Email Address is required",
                  pattern: { 
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    messsage: " Please enter a valid email address "
                  }
                 })}  type="email" placeholder="Email" className={` ${errors.email ? "border-red-500" : ""} block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm`}/>
          </div>




          <div className={`col-span-full relative ${errors.password ? "border-red-500" : ""}`}>
            
          <div className='flex flex-row justify-between'>
            <div>
          <label className="block mb-3 text-sm font-medium text-gray-600"> Password </label>

            </div>
            <div>
            {errors.password && 
              <p className='text-red-500 text-end'>{errors.password.message}</p>}

            </div>
            

          </div>
          <input
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                        message:
                          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
                      },
                    })}
                    id="password"
                    type={`${passTogle}`}
                    placeholder="********"
                    className={`block w-full m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />

                {show ? <IoEye  onClick={toggle} className='absolute right-3 bottom-4'/> : <AiFillEyeInvisible onClick={toggle} className='absolute right-3 bottom-4'/>}
          </div>


          <div className={`col-span-full relative ${errors.confirmPassword ? "border-red-500" : ""}`}>
          <div className='flex flex-row justify-between'>
            <div>
          <label className="block mb-3 text-sm font-medium text-gray-600"> Confirm Password </label>

            </div>
            <div>
            {errors.confirmPassword && 
              <p className='text-red-500 text-end'>{errors.confirmPassword.message}</p>}

            </div>
            

          </div>
          <input
                    {...register("confirmPassword", {
                      required: " Confirm your password",
  
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    id="confirmPassword"
                    type={`${passTogle2}`}
                    placeholder="********"
                    className="block w-full m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />

           {show2 ? <IoEye  onClick={toggle2} className='absolute right-3 bottom-4'/> : <AiFillEyeInvisible onClick={toggle2} className='absolute right-3 bottom-4'/>}
          </div>



          <div className="col-span-full">
            <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">  { loading ? <Loader/> : "Submit your request" }  </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
    </>
  )
}

export default App
