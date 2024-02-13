const vp = () => {
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
    const player1=30
    console.log(numbers)
  
    return (
          <div>
          <div className=" grid justify-center grid-rows-10 h-screen">
          <div className="bg-[url('/sl1.jpg')] bg-cover  grid grid-cols-10">{
            numbers.slice(90,100).reverse().map((number)=>{
              return <div  id={number} className="px-3 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-[url('/sl2.jpg')] bg-cover grid grid-cols-10">{
            numbers.slice(80,90).map((number)=>{
              return <div  id={number} className="px-3 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>          })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(70,80).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(60,70).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(50,60).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(40,50).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(30,40).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(20,30).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(10,20).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
          <div className="bg-black grid grid-cols-10">{
            numbers.slice(0,10).map((number)=>{
              return <div  id={number} className="px-2 py-2 border-white text-black  border-2 text-center" key={number}>{number}</div>
            })
          }</div>
  </div>
          </div>      
        
    );
  };
  
  export default vp;
  