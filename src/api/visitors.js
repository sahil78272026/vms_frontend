const BASE = process.env.REACT_APP_BACKEND_BASE_URL;

export async function lookupVisitor(mobile){
  const res = await fetch(`${BASE}/lookup?mobile=${encodeURIComponent(mobile)}`);
  return res.json();
}
export async function submitEntry(payload){
  const res = await fetch(`${BASE}/api/visitors/entry`, {
    method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload)
  });
  return res.json();
}
