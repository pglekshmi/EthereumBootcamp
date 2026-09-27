import { useState } from 'react'


import './App.css'



function App() {

  const [formData,setFormData]=useState({
    cid:0,
    cname:'',
    course:'',
    grade:'',
    date:''
  })

  const [output,setOutput] = useState('')
  

  const handleChange = (event)=>{
    const {name,value} = event.target;
    console.log("Name",name);
    console.log("Value",value);
    
    
    setFormData((prev)=>({...prev,[name]:value}))
  }

 
 
  

  return (
    < div className='m-4'>
    <div>
     <input type='button' value='Connect To Metamask'  className=' border-2 bg-sky-500 rounded-full border-transparent p-3 '/>
    </div>
    <div>
      <p className='font-bold m-4'>Enter Certificate Details</p>
    
    <div className='flex'>
      <p className='mr-2'>Certificate Id:</p>
      <input type='text' id='cid' name='cid' className='border border-black' onChange={handleChange}/>
    </div>

     <div className='flex'>
      <p className='mr-2'>Candidate Name:</p>
      <input type='text' id='cname' name='cname' className='border border-black' onChange={handleChange}/>
    </div>

     <div className='flex'>
      <p className='mr-2'>Course:</p>
      <input type='text' id='course' name='course' className='border border-black' onChange={handleChange}/>
    </div>

      <div className='flex'>
      <p className='mr-2'>Grade:</p>
      <input type='text' id='grade' name='grade' className='border border-black' onChange={handleChange} />
    </div>

      <div className='flex'>
      <p className='mr-2'>Date:</p>
      <input type='date' id='date' name='date' className='border border-black' onChange={handleChange} />
    </div>

    <div className='m-4'>
      <input type='button' className=' border-2 bg-sky-500 rounded-full border-transparent p-3 '  value='Issue Certificate'/>
    </div>

    </div>

    <div>
      <div>
        <p className='font-bold m-4'>Certificate Details</p>
      </div>
      <div className='flex'>
        <p>Certificate Id:</p>
        <input type='text' id='certId' name='certId'className='border border-black'/>
      </div>
      <div>
        <input type='button' value='Get Certificate' className=' border-2 bg-sky-500 rounded-full border-transparent p-3 ' />
      </div>
      <div>
        <p>{output}</p>
      </div>
    </div>
    </div>
  )
}

export default App