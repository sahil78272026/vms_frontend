const BASE = process.env.REACT_APP_BACKEND_BASE_URL;

// export async function residentLogin(mobile, password){
//   const res = await fetch(`${BASE}/api/auth/resident/login`, {
//     method: "POST", headers: {"Content-Type":"application/json"},
//     body: JSON.stringify({mobile, password})
//   });
//   if(!res.ok) throw new Error("Login failed");
//   return res.json();
// }

export async function residentRegister(payload){
  const res = await fetch(`${BASE}/api/auth/resident/register`, {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function residentLogin(mobile, password) {
  const res = await fetch(`${BASE}/api/auth/resident/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error || "Login failed");
    err.status = res.status;
    throw err;
  }

  return data;
}

