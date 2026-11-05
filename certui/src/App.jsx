import { useState } from 'react'
import { BrowserProvider, Contract } from 'ethers';
import cert from './assets/Cert.json'


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

  const provider = new BrowserProvider(window.ethereum);

  const connectMetamask = async()=>{
    await provider.send("eth_requestAccounts")
    const signer =await provider.getSigner();
    console.log("Suucessfully connected to", signer.address)
  }

  const handleIssue=async()=>{
    const signer = await provider.getSigner()
    const contractInstance = new Contract(cert.ContractAddress,cert.abi,signer)
    const txreceipt = await contractInstance.issue(formData.cid,formData.cname,formData.course,formData.grade,formData.date)
    await txreceipt.wait();
    console.log("The transaction hash is",txreceipt.hash)
  }

 const handleGetCertificate = async()=>{
  const signer = await provider.getSigner();
  const contractInstance = new Contract(cert.ContractAddress,cert.abi,signer)
  const cid = document.getElementById("certId").value
  console.log("Certificate Id",cid)
  const certDetails = await contractInstance.Certificates(cid)
  console.log("Certificate Details",certDetails)
  setOutput(`Certificate ID:${certDetails[0]} Candidate Name:${certDetails[1]} Course:${certDetails[2]} Grade:${certDetails[3]} Date:${certDetails[4]}`)
 }
 
  

  return (
    < div className='m-4'>
    <div>
     <input type='button' value='Connect To Metamask' onClick={connectMetamask} className=' border-2 bg-sky-500 rounded-full border-transparent p-3 '/>
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
      <input type='button' className=' border-2 bg-sky-500 rounded-full border-transparent p-3 ' onClick={handleIssue}  value='Issue Certificate'/>
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
        <input type='button' value='Get Certificate' onClick={handleGetCertificate} className=' border-2 bg-sky-500 rounded-full border-transparent p-3 ' />
      </div>
      <div>
        <p>{output}</p>
      </div>
    </div>
    </div>
  )
}

export default App