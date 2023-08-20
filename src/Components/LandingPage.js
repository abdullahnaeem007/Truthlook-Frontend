import React from 'react'
import { useState } from 'react'
import { BsSuitDiamondFill,BsArrowDownSquare,BsArrowUpSquare } from 'react-icons/bs'
import SeoPic from '../assets/SEOpic.png'
import logo from '../assets/logo.png'

function LandingPage() {

  const [DropdownCheck,setDropdownCheck]=useState(false)

  function HandleDropDownCHeck()
  {
    setDropdownCheck(!DropdownCheck)
  }

  function RedirectLogin()
  {
    window.location.replace('/login')
  }

  function RedirectSignup()
  {
    window.location.replace('/signup')
  }

  return (
    <div class='w-full min-h-[100vh]'>
        <div class={DropdownCheck==true?'w-full h-fit flex justify-between items-start py-5':'w-full h-fit flex justify-between items-center py-5'}>
          <div class='py-5 sm:px-16 ml-4 flex items-center'>
            <img src={logo} class='w-32'/>
          </div>
          <div class='w-fit flex flex-col py-5 sm:px-16  text-xl text-white'>
            <button class='flex items-center'  >
              <text class='mr-3 hover:underline hover:text-[#4FC0D0]'onClick={RedirectLogin}>Login</text>
              {
                DropdownCheck==false?
                <BsArrowDownSquare class='hover:text-[#4FC0D0]' onClick={HandleDropDownCHeck}/>
                :
                <BsArrowUpSquare class='hover:text-[#4FC0D0]' onClick={HandleDropDownCHeck}/>
              }
            </button>
            {
              DropdownCheck==true?
              <button class='py-5 mt-5  absolute flex items-center text-xl text-white'>
                <text class='hover:underline hover:text-[#4FC0D0] text-purple-100' onClick={RedirectSignup}>Signup</text>
              </button>
              :
              <></>
            }
          </div>
        </div>

        <div class='w-full py-14 sm:px-20 px-4 flex lg:flex-row flex-col space-y-14'>

          <div class='lg:w-1/2 w-full flex flex-col text-white space-y-16'>
            <text class='sm:text-[8vh] text-[5vh] lg:text-start text-center font-Montserrat'>Search Engine Optimization</text>
            <text class='font-Josefin-Sans text-xl lg:text-start text-center text-white/80'>Our Unbiased Search Engine is a tool ensuring fair, non-partisan access to web content. Utilizing advanced algorithms, it scans billions of pages to provide relevant results, free from personalized biases. We uphold user privacy and aim to foster an open, equal internet for everyone</text>
            <button class='btn6' onClick={RedirectSignup}>
              <text class='text-xl font-Montserrat' >Get Started</text>
            </button>
          </div>

          <div class='lg:w-1/2 w-full flex lg:justify-end justify-center items-center'>
            <img src={SeoPic}></img>
          </div>
          
        </div>

    </div>
  )
}

export default LandingPage