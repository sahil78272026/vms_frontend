import React, {useEffect, useState} from "react";

export default function Dashboard(){
  const [visits,setVisits] = useState([]);
  async function load(){
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/residents/me/pending", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(data)
    setVisits(data);
  }
  async function action(id, type){
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/residents/visit/${id}/${type}`, {
      method:"POST", headers: { Authorization: `Bearer ${token}` }
    });
    load();
  }
  useEffect(()=>{ load(); }, []);
  return (
    <div className="container mt-4">
      <h3>Pending Visitors</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Mobile</th><th>Purpose</th><th>Action</th></tr></thead>
        <tbody>
          {visits.map(v=>(
            <tr key={v.id}>
              <td>{v.visitor_name}</td>
              <td>{v.mobile}</td>
              <td>{v.purpose}</td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={()=>action(v.id,"approve")}>Approve</button>
                <button className="btn btn-danger btn-sm" onClick={()=>action(v.id,"reject")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
