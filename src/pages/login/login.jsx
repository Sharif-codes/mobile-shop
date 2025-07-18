import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
// import { getToken, saveUser } from '../../api/auth'
import toast from 'react-hot-toast'
import { ImSpinner3 } from "react-icons/im";
import useAuth from '../../Hooks/useAuth';
import { saveUser } from '../../Api/saveUser';
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useState } from 'react';
// import useSaveUser from '../../hooks/useSaveUser';

// import { saveUser } from '../../api/auth';

const Login = () => {
const [showPass, setShowPass]= useState(0)
  const navigate = useNavigate()
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth()
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/";


  console.log("click:", showPass);
  const handleLogin = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    console.log(email, name, password)

    try {

      // signin
      const result = await signIn(email, password)
      console.log(result);

      //get token
      // await getToken(result?.user?.email)
      toast.success('Successfully login')
      setLoading(0)
      navigate(from, { replace: true })
    }
    catch (error) {
      console.log(error);
      setLoading(0)
      toast.error(error?.message)
    }
  }
  const handleGoogleSignIn = () => {
    try {
      signInWithGoogle()
        .then(result => {
          console.log(result);
          const img = result?.user?.photoURL;
          saveUser(result?.user, result?.user?.displayName, null, img)
          //get token
          // getToken(result?.user?.email)
          toast.success('successfully Logged In!')
          setLoading(0)
          navigate(from, { replace: true })
          console.log(loading);
        })
    }
    catch (error) {
      console.log(error);
      setLoading(0)
      toast.error(error?.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>Signin</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-info bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>

              <div className='relative'>

              
              <input
              
                type={`${showPass ? "text": "password" }`}
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-info bg-gray-200 text-gray-900 '
              >
                
              </input>
              <div onClick={()=> setShowPass(!showPass)}  className='absolute top-[11px] right-4 cursor-pointer'>
                {
                  showPass === true ? <IoEyeOffSharp className='text-xl' /> : <IoEyeSharp className='text-xl' />
                }
               
              </div>
              </div>
             
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-info w-full rounded-md py-3 text-white'
            >
              {loading ? (<ImSpinner3 className='animate-spin m-auto'></ImSpinner3>) : ("Continue")}
            </button>
          </div>
        </form>
        <div className='space-y-1'>

        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/register'
            className='hover:underline hover:text-info text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;