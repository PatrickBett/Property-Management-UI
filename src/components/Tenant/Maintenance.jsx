

function Maintenance() {
  return (
    <div className="container border my-3 p-2">
        <h2 className="p-3 text-center bg-secondary">Property Maintenance </h2>
        <button className="btn btn-warning my-3" data-bs-toggle="modal" data-bs-target="#myModal"><i className="bi bi-plus-circle-fill me-2"></i> Maintenance</button>

         <div id="myModal" className="modal" role="dialog">
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
         
        
      </div>
  )
}

export default Maintenance