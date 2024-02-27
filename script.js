document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('videoElement');
    const canvasElement = document.getElementById('canvasElement');
    const ctx = canvasElement.getContext('2d');
    const results = document.getElementById('results');

    // Access the webcam
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                videoElement.srcObject = stream;
            })
            .catch(function(err0r) {
                console.log("Something went wrong with webcam access!");
            });
    }

    // Function to send image data to the backend for object detection
    function detectObjects(imageData) {
        fetch('/detect', {
            method: 'POST',
            body: imageData
        })
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            results.innerHTML = '';

            // Draw results
            data.detections.forEach(detection => {
                const { label, confidence, box } = detection;
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `<strong>${label}</strong> - Confidence: ${confidence.toFixed(2)}`;
                results.appendChild(resultItem);

                // Draw bounding box on canvas
                ctx.beginPath();
                ctx.rect(box[0], box[1], box[2] - box[0], box[3] - box[1]);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Perform object detection every frame
    setInterval(() => {
        // Draw the current frame from the webcam on the canvas
        ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        // Get image data from canvas
        const imageData = canvasElement.toDataURL('image/jpeg');

        // Call detectObjects function with image data
        detectObjects(imageData);
    }, 100); // Update every 100 milliseconds
});
