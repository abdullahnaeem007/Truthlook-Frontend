import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'
import '../App.css'
import SearchResults from './SearchResults'
import { json } from 'react-router-dom'
import Swal from 'sweetalert2'



function SearchPage() {
    const Backend = process.env.REACT_APP_BACKEND
    const [InputSearch,setInputSearch]=useState('')
    const [ResultArr,setResultArr]=useState([])
    const [showResults,setshowResults]=useState(false)
    const [isLoading,setisLoading]=useState(false)
    
    function handleInput(event)
    {
        setInputSearch(event.target.value)
    }

    function ClearInput()
    {
        setInputSearch('')
    }

    async function RedirectResults()
    {
        if(InputSearch.length>0)
        {
            setisLoading(true)
            const res=await fetch('http://truthlookbackend-production.up.railway.app/search',{
                method:'POST',
                body:JSON.stringify({query:InputSearch}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const solution=await res.json()
            setResultArr(solution)

            setisLoading(false)

            setshowResults(true)
        }
    }

    function RedirectHistory()
    {
        window.location.replace('/history')
    }

    function LogOutFunction()
    {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }

    useEffect(()=>
    {
        const usersession = JSON.parse(sessionStorage.getItem("session"))?.user.email;
        if (usersession === undefined || usersession === null) {
            window.location.href = "/login";
        }
    },[])

    useEffect(()=>
    {
        if(isLoading==true)
        {
            Swal.fire({
                title:'Getting Result',
                didOpen:()=>
                {
                    Swal.showLoading()
                }
            })
        }
        else
        {
            Swal.close()
        }
    },[isLoading])

  return (
    <div>
        {
            showResults==false?
            <div class='backMain2'>
                <div class='absolute w-full flex justify-end py-5 px-8'>
                    <button class='bg-gray-400 md:px-14 sm:px-10 px-8 py-3 rounded-lg text-white' onClick={LogOutFunction}>Log out</button>
                </div>
                <div class='w-full h-full flex justify-center items-center'>
                    <div class='lg:w-1/2 md:w-[65%] w-[80%] h-1/2 flex flex-col items-center text-white justify-evenly'>
                        <text class='sm:text-4xl text-3xl text-center font-thin'>What are you looking for?</text>
                        <div class='w-full h-[7.5vh] flex flex-row bg-white rounded-md items-center px-5'>
                            <BsSearch color='black' size='1.5rem'/>
                            <input class='w-full h-full text-black rounded-md outline-none px-5 text-lg' onChange={handleInput} value={InputSearch}></input>
                            {
                                InputSearch.length!=0?
                                <GrClose color='black' size='1.5rem' onClick={ClearInput}/>
                                :
                                <></>
                            }
                        </div>

                        <div class='w-full h-[15%] flex flex-row items-center justify-evenly sm:text-base text-sm '>
                            <button class='btn1' onClick={RedirectResults}>Truthlook Search</button>
                            <button class='btn2' onClick={RedirectHistory}>Search History</button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <SearchResults ResultArr={ResultArr} setResultArr={setResultArr} InputSearch={InputSearch} setInputSearch={setInputSearch} setshowResults={setshowResults}/>
        }
    </div>
  )
}

export default SearchPage