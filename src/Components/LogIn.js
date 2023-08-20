import React from 'react'
import '../App.css'
import { BiUser } from 'react-icons/bi'
import { AiOutlineLock } from 'react-icons/ai'
import supabase from '../Supabase'
import Swal from 'sweetalert2'

async function Handler(email, password) {
  if (email === "" || password === "") {
    Swal.fire({
        title:'Error',
        text:'Please fill all the fields',
        icon:'error'
    })
    return false;
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
        Swal.fire({
            title:'Invalid credentials',
            icon:'error'
        })
    } else {

      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email);

      if (error) Swal.fire({
        title:'Invalid credentials',
        icon:'error'
    });
      else if (Users.length > 0) {

        const tok = localStorage.getItem(
          "sb-vzbmtkiyxhdudxdmnycg-auth-token"
        );
        sessionStorage.setItem("session", tok);
        sessionStorage.setItem("user", JSON.stringify(Users[0]));

        return true;

      }
    }
  } catch (e) {
    Swal.fire({
        title:'Invalid credentials',
        icon:'error'
    })
  }
  return false;
}

function LogIn() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const EmailInputChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordInputChange = (event) => {
    setPassword(event.target.value);
  };

  async function login() {
    const check = await Handler(email, password);
    if (check) {
        Swal.fire({
            title:'Log in successful',
            text:'Proceeding to truthbook search',
            icon:'success'
        }).then(function(){
            window.location.replace('/search')
        })
    }
  }

  function Redirectsignup() {
    window.location.replace('/signup')
  }

  return (
    <div class='backMain2'>
      <div class='w-full h-full flex justify-center items-center'>
        <div class='lg:w-[50%] md:w-[70%] w-4/5 h-2/3 bg-white/10 rounded-3xl items-center flex flex-col py-8 md:px-16 px-8 justify-between'>
          <text class='text-4xl text-white font-thin text-center'>USER LOGIN</text>
          <div class='w-full h-[50%] flex flex-col justify-evenly'>
            <div class='w-full h-[27%] flex items-center rounded-md border-[3px] border-[#30A2FF]'>
              <div class='h-full w-[10%] hidden md:flex justify-center items-center rounded-s-md border-r-[3px] border-[#30A2FF] bg-white'>
                <BiUser size='2rem' />
              </div>
              <input class='md:w-[90%] w-full h-full md:rounded-e-md md:rounded-s-none rounded-md outline-none px-3 text-lg' placeHolder='Enter your email' onChange={EmailInputChange}></input>
            </div>
            <div class='w-full h-[27%] flex items-center rounded-md border-[3px] border-[#30A2FF]'>
              <div class='h-full w-[10%] hidden md:flex justify-center items-center rounded-s-md border-r-[3px] border-[#30A2FF] bg-white'>
                <AiOutlineLock size='2rem' />
              </div>
              <input class='md:w-[90%] w-full h-full md:rounded-e-md md:rounded-s-none rounded-md outline-none px-3 text-lg' placeHolder='Enter your password' type='password' onChange={passwordInputChange} ></input>
            </div>
          </div>
          <div class='w-full h-[30%] flex flex-col justify-between'>
            <div class='w-full h-[45%] text-white'>
              <button class='btn3' onClick={login}>Log in</button>
            </div>
            <div class='w-full h-[45%] text-white' onClick={Redirectsignup}>
              <button class='btn4'>Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn