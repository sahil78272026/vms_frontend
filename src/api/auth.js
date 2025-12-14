const BASE = "http://localhost:5000/api";

export async function residentLogin(mobile, password){
  const res = await fetch(`${BASE}/auth/resident/login`, {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({mobile, password})
  });
  if(!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function residentRegister(payload){
  const res = await fetch(`${BASE}/auth/resident/register`, {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return res.json();
}
