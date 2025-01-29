

function Maintenance() {
  return (
    <div className="container border my-3 p-2">
        <h2 className="p-3 text-center bg-secondary">Property Maintenance <button className="btn btn-warning my-3"><i className="bi bi-plus-circle-fill me-2"></i> Maintenance</button></h2>
        <div className="container border">
            <h3 className="p-3">No Maintenance Currently Scheduled.</h3>          
        </div>
      </div>
  )
}

export default Maintenance