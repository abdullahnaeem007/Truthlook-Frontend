import React, { useEffect } from 'react'

function SingleResult(props) {

  function RedirectUrl()
  {
    const historyArr=[]
    const items=JSON.parse(localStorage.getItem('historyArr'))
    if(items)
    {
      if(items.some(elem=>elem.link==props.obj.link)==false)
      {
        items.push(props.obj)
      }
      localStorage.setItem('historyArr',JSON.stringify(items))
    }
    else
    {
      historyArr.push(props.obj)
      localStorage.setItem('historyArr',JSON.stringify(historyArr))
    }
    
    window.open(props.obj.link, '_blank');
  }
  
  return (
    <div class='w-full h-fit flex flex-col justify-evenly bg-black/40 rounded-md mb-3 px-5 py-5 text-white'>
        <text class='font-extralight mb-2'>{props.obj.displayLink}</text>
        <button class='mb-2 text-start text-3xl font-medium text-[#E36BAE] hover:underline' onClick={RedirectUrl}>{props.obj.title}</button>
        <text class='text-lg'>{props.obj.snippet}</text>
    </div>
  )
}

export default SingleResult



{/* <div class='w-full h-[20vh] flex flex-col justify-evenly border-b-[1px] border-t-[1px] mb-3 px-5 py-3 text-white'>
        <text class='font-extralight'>www.Youtube.com</text>
        <button class='text-start text-3xl font-medium text-[#E36BAE] hover:underline'>21 Great Search Engines You Can Use Instead Of Google</button>
        <text class='text-lg'>21 Great Search Engines You Can Use Instead Of Google ; 1. You.com ; 2. Yep.com ; 3. Openverse ; 4. Bing.com ; 5. Yahoo.com.</text>
    
    </div> */}