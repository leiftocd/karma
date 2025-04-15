
    document.getElementById("lang-switch").addEventListener("change", function () {
        let lang = this.value;
        let cnContent = document.getElementById("karma-content_cn");
        let enContent = document.getElementById("karma-content_en");
        if (lang === "en") {
            enContent.classList.remove("hidden");
            cnContent.classList.add("hidden");
        } else {
            enContent.classList.add("hidden");
            cnContent.classList.remove("hidden");
        }
    });
    document.getElementById("lang-switch").dispatchEvent(new Event("change"));

    // donation line
    
    const donationData = document.getElementById('donation-data');
    const fakeData = 10;
    
    setTimeout(() => {
        // Attempt to fetch data from server
        fetch('http://localhost:3000/api/number') // Replace with your actual API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(serverData => serverData.value !== undefined ? serverData.value : fakeData)
            .catch(error => {
                console.error('Error fetching data:', error);
                return fakeData; // Fallback to 100 if error occurs
            })
            .then(data => {
                let currentValue = 0;
                let animationRunning = false;
    
                const paths = document.querySelectorAll('svg path');
                const totalPaths = paths.length; // expected to be 88
                const pathsToAnimate = Math.round((data / 100) * totalPaths);
                let count = 0;
    
                const interval = setInterval(() => {
                    if (currentValue <= data) {
                        donationData.innerHTML = `${currentValue}%`;
                        currentValue++;
    
                        if (currentValue > data) {
                            clearInterval(interval);
                        }
                    }
                    if (currentValue <= data && !animationRunning) {
                        animationRunning = true;
                        const timeDelay = 100 / (totalPaths - 2) / 19.8; // Adjusted delay for path animation
    
                        for (let i = totalPaths - 1; i >= 0 && count < pathsToAnimate; i--, count++) {
                            paths[i].style.animationDelay = `${count * timeDelay}s`; // Control animation delay
                            paths[i].classList.add('line');
                        }
                    }
                }, 50);
    
            });
    }, 100);