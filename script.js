document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('live-video');
    const statusTextElement = document.getElementById('status-text');
    const alertListElement = document.getElementById('alert-list');

    // Simulate live video feed
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            videoElement.srcObject = stream;
            statusTextElement.textContent = 'Connected';
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
            statusTextElement.textContent = 'Error: Camera access denied';
        });

    // Simulated alerts
    const alerts = [
        'Motion detected in Area 1',
        'Unauthorized access detected',
        'Connection lost to camera 2'
    ];

    // Display simulated alerts
    alerts.forEach(function(alert) {
        const li = document.createElement('li');
        li.textContent = alert;
        li.classList.add('alert');
        alertListElement.appendChild(li);
    });
});
