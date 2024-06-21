self.addEventListener('push', function(e) {
    const { title, message } = e.data.json()
    var options = {
        body: message,
        icon: "sample@sample.com",
        vibrate: [100, 50, 100],
        urgency: "high",
        data: {
            dateOfArrival: Date.now(),
            primaryKey: "2"
        },
        actions: []
    }
    console.log(e.data.json())
    e.waitUntil(

        self.registration.showNotification(data.title, options)
    )
}
)

