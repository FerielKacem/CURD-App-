
import './Home.css';
import React , {useState , useEffect } from 'react';
import {Link, link} from 'react-router-dom';
import{toast} from 'react-toastify';
import axios from 'axios';

function Home() {

const [data , setData] = useState([]);
const [searchTitle, setSearchTitle] = useState("");
const [loading, setLoading] = useState(false);
const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
    setLoading(false);
}

useEffect(()=>{
 loadData() ;  
},[])


const handelDelete = (id)=>{
    if(window.confirm("Are you sure that you wanted to delete that contact")){
       axios.delete(`http://localhost:3001/api/remove/${id}`) ;
       toast.success("contact deleted successfully");
       setTimeout(()=>loadData(),500)
    }
}

  return ( <div>


    <div style={{marginTop : "150px"}}> 

    <Link to ='/Addcontact'>

<button> Add contact</button>
</Link>
<input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={event => {setSearchTitle(event.target.value)}}
      />

    <table id="customers">
        <thead>
<tr>
    <th style={{textAlign:"center"}}>number</th>
    <th style={{textAlign:"center"}}>name</th>
    <th style={{textAlign:"center"}}>email</th>
    <th style={{textAlign:"center"}}>contact</th>
    <th style={{textAlign:"center"}}>Action</th>
    </tr>
    </thead>

 <tbody>
 {loading ? (
        <h4>Loading ...</h4>
      ) : (
         data.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchTitle.toLowerCase())||value.contact.toLowerCase().includes(searchTitle.toLowerCase())||value.email.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item, index) =>{return(<tr key={item.id}>
            <th scope='row'>{index+1}</th>
               <td>{item.name}</td>
               <td>{item.email}</td>
               <td>{item.contact}</td>
               <td>
                   <Link to ={`/update/${item.id}`}>
                   <button  >Edit</button>
                   
                   </Link>
                  <button onClick={()=>handelDelete(item.id)}> Delete</button>
                  
                   <Link to ={`/view/${item.id}`}>
                   <button >View</button>
                   
                   </Link>
                   </td> 
               </tr>)} )
      )}











    
    
    </tbody>
</table>
    </div>
    </div>
   
  );
}

export default Home;
