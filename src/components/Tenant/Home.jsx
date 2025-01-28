
import api from "../../api";
import { useEffect, useState } from "react";

function Home() {

  
const [home ,setHome] = useState([])
  
    useEffect(()=>{
      getHome()
    },[])
  
    const getHome =async() =>{
  
      try{
        const response = await api.get('http://127.0.0.1:8000/api/myhome')
        setHome(response.data)
        console.log(response.data)
  
      }
      catch(error){
        console.log(error)
      }
  
    }
  return (
    <>
    <div className="container border bg-secondary">
      
      <button className="btn-success m-2 p-5 cols-sm-4">
        Notifications
      </button>
      <button className="btn-warning m-2 p-5 cols-sm-4">
        Notifications
      </button>
      <button className="btn-primary m-2 p-5 cols-sm-4">
        Notifications
      </button>
      <button className="btn-danger m-2 p-5 cols-sm-4">
        Notifications
      </button>
    </div>


    <div className="container border mt-3">
      <h2 className="text-center py-3">My Home</h2>

      { home.map((home,index)=>(
        <div className="container border p-4 mb-4 rounded shadow-sm" key={index}>
        <h5 className="text-primary">{home.property.title}</h5>
        <p>
          <strong>Tenant:</strong> {home.tenant.username} ({home.tenant.role})
        </p>
        <p>
          <strong>Rent:</strong> {home.property.rent_amount} KES
        </p>
      </div>
      
      )) }

    </div>
    </>
  )
}

export default Home