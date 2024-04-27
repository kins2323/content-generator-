document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const topicInput = document.getElementById('topic');
    const audienceInput = document.getElementById('audience');
    const platformSelect = document.getElementById('platform');
    const outputArea = document.getElementById('output');
    const loader = document.getElementById('loader');

    generateBtn.addEventListener('click', async () => {
        // Reset output and display loader
        outputArea.textContent = '';
        loader.classList.add('loading');

        try {
            const topic = topicInput.value;
            const audience = audienceInput.value;
            const platform = platformSelect.value;

            // Make a request to your backend server
            const response = await fetch('/generate-ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic, audience, platform })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            outputArea.textContent = data.ideas;

        } catch (error) {
            console.error('Error fetching ideas:', error);
            outputArea.textContent = 'An error occurred while generating ideas. Please try again.';
        } finally {
            // Hide loader
            loader.classList.remove('loading');
        }
    });
});
