import { useEffect, useState } from "react"
import api from "../../api"
function Maintenance() {

  const [maintenances, setMaintenances] = useState([])
  useEffect(
    ()=>{
      fetchMaintenances()
    },[]
  )

  const fetchMaintenances = async () => {
    try {
      const res = await api.get("http://127.0.0.1:8000/api/maintenances/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`, // Include auth token if required
        },
      });
      setMaintenances(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    }
  };




  return (
    <div className="container border my-3 p-2">
        <h2 className="p-3 text-center bg-secondary">Property Maintenance </h2>
        <button className="btn btn-warning my-3" data-bs-toggle="modal" data-bs-target="#myModal"><i className="bi bi-plus-circle-fill me-2"></i> Maintenance</button>

         <div id="myModal" className="modal mt-5 " role="dialog">
  <div className="modal-dialog">

    {/* Modal content */}
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">maintenance</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal">&times;</button>
       
      </div>

      <form className="modal-body">

      <div className="mb-3 mt-3">
        <label htmlFor="property" className="form-label">Property:</label>
        <select className="form-control" id="property"  name="property">
          <option value="Property1">Property1</option>
          <option value="Property2">Property1</option>
       
        </select>
      </div>

      <div className="mb-3 mt-3">
        <label htmlFor="request" className="form-label">Request:</label>
        <textarea type="text" className="form-control" id="request" placeholder="Enter Request Message" name="request" />
      </div>

      </form>

      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
      </div>
    </div>

  </div>
</div>       
         {/* History of maintenances */}

         { maintenances.length>0 ? maintenances.map((maintenance,index)=>(
          <div key={index} className="border mt-3 p-3 col-sm-4">
            <img src={maintenance.property.url} style={{width: "100%", height:"200px"}}/>
            <h2>Request: {maintenance.request}</h2>
            <h3>Property: {maintenance.property.title}</h3>
            {maintenance.status == "submitted" ? <button className="btn btn-warning">Submitted</button> :
            maintenance.status == "in_progress" ? <button className="btn btn-primary">In-progress...</button> :
            <button className="btn btn-success">Resolved</button> }

          </div>
         ))
         :
         <div className="border p-3 m-3">
          <h3>No Maintenance Request made!!</h3>
         </div>
        }





        
      </div>
  )
}

export default Maintenance