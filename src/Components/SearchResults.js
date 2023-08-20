import React,{useEffect, useState} from 'react'
import { BsSearch } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import SingleResult from './SingleResult'
import Swal from 'sweetalert2'


function SearchResults(props) {
    const Backend = process.env.REACT_APP_BACKEND
    const [InputSearch,setInputSearch]=useState('')
    const [isLoading,setisLoading]=useState(false)

    function ClearInput()
    {
        setInputSearch('')
    }

    function handleInput(event)
    {
        setInputSearch(event.target.value)
    }

    function RedirectHistory()
    {
        window.location.replace('/history')
    }

    async function RedirectResults()
    {
        if(InputSearch.length>0)
        {
            setisLoading(true)
            console.log(InputSearch)
            const res=await fetch('http://truthlookbackend-production.up.railway.app/search',{
                method:'POST',
                body:JSON.stringify({query:InputSearch}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const solution=await res.json()
            props.setResultArr(solution)
            setisLoading(false)
        }
    }

    useEffect(()=>
    {
        if(props.InputSearch.length>0)
        {
            setInputSearch(props.InputSearch)
        }
    },[])

    useEffect(()=>
    {
        if(isLoading==true)
        {
            Swal.fire({
                title:'Getting unbiased content',
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
    <div class='w-full min-h-[100vh] p-10 flex flex-col'>
        <div class='w-full h-fit flex lg:flex-row flex-col items-center justify-between text-white mb-14 space-y-5 text-sm md:text-base'>
            <div class='lg:w-[60%] w-full py-4 flex flex-row bg-white rounded-md items-center px-5'>
                <BsSearch color='black' size='1.5rem'/>
                <input class='w-full h-full text-black sm:text-lg rounded-md outline-none px-5 text-base' onChange={handleInput} value={InputSearch}></input>
                {
                    props.InputSearch.length!=0?
                    <GrClose color='black' size='1.5rem' onClick={ClearInput}/>
                    :
                    <></>
                }
            </div>
            <div class='w-fit h-full pb-5 space-x-4 flex items-center sm:text-base text-sm'>
                <button class='btn5' onClick={RedirectResults}>Truthlook Search</button>
                <button class='btn6' onClick={RedirectHistory}>Search History</button>
            </div>
        </div>
        
        {
            props.ResultArr.map((obj)=>

                obj.BiasedContent!='Yes'?
                    <SingleResult obj={obj} />
                :
                    <></>
            )
        }
    </div>
  )
}

export default SearchResults