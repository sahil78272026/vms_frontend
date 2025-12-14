import React, {useState} from "react";
import { residentLogin } from "../../api/auth";

export default function Login(){
  const [mobile,setMobile] = useState(""), [pw,setPw]=useState(""), [err,setErr]=useState("");

  async function submit(e){
    e.preventDefault();
    try{
      const data = await residentLogin(mobile,pw);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", "resident");
      window.location.href = "/residents/dashboard";
    }catch(err){
      setErr("Invalid credentials");
    }
  }
  return (
    <div className="container mt-4">
      <h3>Resident Login</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit} className="card p-3">
        <input className="form-control mb-2" placeholder="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
