import React, { useEffect, useState } from 'react'
import { FaShieldAlt } from 'react-icons/fa'
import SingleResult from './SingleResult'
import Swal from 'sweetalert2'

function SearchHistory() {

    const [ResultArr,setResultArr]=useState([])

    function ClearResults()
    {
     
        Swal.fire({
            title:'Are you sure?',
            text:'You will not be able to restore history',
            type:'warning',
            showCancelButton:true,
            confirmButtonColor:'#4FC0D0',
            confirmButtonText:'Yes,clear history'
        }).then(function(result){
            if(result.isConfirmed){
                localStorage.clear()
                window.location.reload()
            }
        })
        
    }

    function RedirectSearch()
    {
        window.location.replace('/search')
    }

    useEffect(()=>{
        const items=JSON.parse(localStorage.getItem('historyArr'))
        if(items)
        {
            setResultArr(items)
        }
    },[])

    useEffect(()=>
    {
        const usersession = JSON.parse(sessionStorage.getItem("session"))?.user.email;
        if (usersession === undefined || usersession === null) {
            window.location.href = "/login";
        }
    },[])
    

  return (
    <div class='w-full min-h-[100vh] sm:p-10 p-5 flex flex-col'>
        <div class='w-full flex flex-col items-center py-8 space-y-8'>
            <text class='text-5xl text-center text-white font-light'>Search History</text>
            <div class='w-full flex lg:flex-row flex-col items-center justify-between space-y-5'>
                <div class='lg:w-1/2 w-full sm:px-4 py-4 flex items-center justify-center border-white/80 border-[1px] rounded-md text-white'>
                    <FaShieldAlt color='#E36BAE' class='sm:block hidden'/>
                    <text class='text-center sm:mx-5 mx-2 sm:text-base text-sm'>Truthbook protects your privacy and security</text>
                </div>
                <div class='space-x-5 flex'>
                    <button class='sm:px-5 px-1 py-4 rounded-md text-white bg-[#4FC0D0] sm:text-base text-sm' onClick={RedirectSearch}>Return to Search Engine</button>
                    <button class='sm:px-5 px-1 py-4 rounded-md text-white bg-[#B31312] sm:text-base text-sm' onClick={ClearResults}>Clear History</button>
                </div>
            </div>
        </div>
        {
            ResultArr.map((obj)=>
                <SingleResult obj={obj} />
            )
        }
    </div>
  )
}

export default SearchHistory