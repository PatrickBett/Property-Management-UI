// http://127.0.0.1:8000/api/account/
import { useState, useEffect } from "react"
import api from "../../api"
function Account() {
  const [account, setAccount] = useState("")

  useEffect(
   ()=>{
    fetchAccount()
   } 
   ,[])


    const fetchAccount= async()=>{
      try{
        const response = await api.get("http://127.0.0.1:8000/api/account/")
        setAccount(response.data)
        console.log(response.data)
  
      }
      catch(error){
        console.log(error)
      }
    }


  return (
    <div className="container border m-3 p-3">
      {account &&(
        <>
         <div className="col-md-6">
            <img src={account.profile.profile} style={{width:"100%", height:"50vh"}}></img>
           
          </div>

          <div className="col-md-6 mt-3 p-5">
            <h4>Email: </h4>{account.email}
            <h4>First Name: </h4>{account.first_name}
            <h4>Last Name: </h4>{account.last_name}
            <h4>Username: </h4>{account.username}
            <h4>Phone Number: </h4>{account.phone_number}<br/>
            <button className="btn btn-primary"><i className="bi bi-pencil-fill me-2"></i>Update Profile</button>

          </div>
        </>
         
        )
      }

    </div>
  )
}

export default Account