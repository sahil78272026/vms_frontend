self.addEventListener("push", event => {
  const text = event.data.text();

  event.waitUntil(
    self.registration.showNotification("Visitor Alert", {
      body: text,
      icon: "/icon.png"
    })
  );
});
