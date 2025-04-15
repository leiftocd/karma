
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
    const fakeData = 100;
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
                return fakeData; // Fallback to 15 if error occurs
            })
            .then(data => {
                let currentValue = 0;
    
                // Start interval for loading effect
                const interval = setInterval(() => {
                    donationData.innerHTML = `${currentValue}%`;
                    currentValue++;
    
                    // Stop when reaching the target data value
                    if (currentValue > data) {
                        clearInterval(interval);
                        donationData.innerHTML = `${data}%`; // Ensure final value is exact
                    }
                }, 100); // 0.1s = 100ms
    
                // SVG path animations mapped from 0-100 to 88 available paths
                const paths = document.querySelectorAll('svg path');
                const totalPaths = paths.length; // expected to be 88
                // Calculate number of paths to animate based on the data value (max 100)
                const pathsToAnimate = Math.round((data / 100) * totalPaths);
                
                // Animate the last paths in the NodeList
                let count = 0;
                const timeDelay = 100 / (totalPaths - 2)/10;
                for (let i = totalPaths - 1; i >= 0 && count < pathsToAnimate; i--, count++) {
                    paths[i].style.animationDelay = `${count * timeDelay}s`;
                    paths[i].classList.add('line');
                }
            });
    }, 1000);
    