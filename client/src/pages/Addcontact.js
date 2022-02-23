import react , {useState , useEffect} from 'react';
import { useParams , Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import './Add.css';
import axios from 'axios';
import {toast} from 'react-toastify'

const intialState = {
    name : "",
    email : "",
    contact : ""}


const Addcontact =() => {

const [State , setState] =useState(intialState);

const {name, email , contact }= State;


const handelChangeInput =(e)=>{
      const {name,value} = e.target;
      setState({...State,[name]: value})
    }

const {id} = useParams();
useEffect(()=>{
axios.get(`http://localhost:3001/api/get/${id}`).then((resp) =>{
  setState ({...resp.data[0]})
})}, [id])



const navigate = useNavigate();
  function handleClick() {
    navigate('/')
  }


 const handelsubmit =(e)=>{
     e.preventDefault();
     if(!name|| !email ||!contact ){
     toast.error("Please provide value into each input field")}
     else {
       if (!id){ axios.post("http://localhost:3001/api/post" ,{
        name ,
        email,
        contact 
    }).then (()=>{
     setState({name : "", email:"",contact : ""})

    }).catch((err)=>{toast.error(err.response.data)});
    toast.success("Contact Added Succesfully")
    setTimeout(()=>handleClick(),500)}
    else{
      axios.put(`http://localhost:3001/api/update/${id}` ,{
      name ,
      email,
      contact 
  }).then (()=>{
   setState({name : "", email:"",contact : ""})

  }).catch((err)=>{toast.error(err.response.data)});
  toast.success("Contact Update Succesfully")
  setTimeout(()=>handleClick(),500)

    }}}
      


  return (
    
<div>
    
    <form >
    <label htmlFor="fname"> Name</label>
    <input type="text" id = "name" value={name ||""}  name ="name" onChange = {handelChangeInput} placeholder="Your name.."/>

    <label htmlFor="lname">Email</label>
    <input type="email" id = "email" value={email ||""} name="email" onChange = {handelChangeInput} placeholder="Your last email.."/>

    <label htmlFor="lname">Contact</label>
    <input type="number" id = "contact" value={contact ||""} name="contact" onChange = {handelChangeInput} placeholder="Your last contact.."/>

   
  
    <input type="submit" onClick={handelsubmit} value={id ? "Update" : "Save"}/>

    <Link to="/">
    <input type="button" value="Go Back ..."/>
    </Link>
  </form>
  
  </div>
  


   
  )
}

export default  Addcontact;