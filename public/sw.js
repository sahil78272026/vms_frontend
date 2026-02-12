self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
});

self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  self.registration.showNotification(
    data.title || "Visitor Alert",
    {
      body: data.body || "A visitor is waiting",
      icon: "/logo192.png"
    }
  );
});
