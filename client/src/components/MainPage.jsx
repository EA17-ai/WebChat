import React from "react"
const MainPage = () => {
    return (
      <div className='flex items-center justify-center h-screen'>
        
        <div className='flex flex-col items-center gap-6 border-2 border-gray-300 px-20 py-12 rounded-xl'>
          <div className="flex-1"> <h1 className="font-bold text-3xl font-serif">Main Page</h1></div>
          <div className="flex-1  text-white bg-blue-500 rounded-xl px-6 py-2"><a href="/join"><button>Join Room</button></a></div>
          <div className="flex-1  text-white bg-gray-500 rounded-xl px-6 py-2"><a href="/create"><button>Create Room</button></a></div>
          <div className="flex-1  text-black bg-green-300 rounded-xl px-6 py-2"><a href="/existinguser"><button>Existing User</button></a></div>
          
        </div>
      </div>
    )
  }
  
  export default MainPage
  