// Function to calculate the Euclidean distance between two RGB colors
function getEuclideanDistance(color1, color2) {
    return Math.sqrt(
        Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
}

// Function to find the closest color in the predefined palette
function findClosestColor(pixelColor) {
    let minDistance = Infinity;
    let closestColorIndex = -1;

    rgbColors.forEach((color, index) => {
        const distance = getEuclideanDistance(pixelColor, color);
        if (distance < minDistance) {
            minDistance = distance;
            closestColorIndex = index;
        }
    });

    return closestColorIndex;
}

// Handle image upload and processing
document.getElementById('imageUpload').addEventListener('change', (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const totalFiles = Math.min(files.length, 10);
    const colorCounts = new Array(130).fill(0);
    let totalPixels = 0;

    // Clear existing thumbnails
    const thumbnailList = document.getElementById('thumbnailList');
    thumbnailList.innerHTML = '';

    for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        const img = new Image();
        img.src = URL.createObjectURL(file);

        // Create thumbnail
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = img.src;
        const fileName = document.createElement('span');
        fileName.textContent = `${i + 1}. ${file.name}`;
        thumbnailItem.appendChild(thumbnailImg);
        thumbnailItem.appendChild(fileName);
        thumbnailList.appendChild(thumbnailItem);

        img.onload = () => {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            totalPixels += img.width * img.height;

            // Process each pixel
            for (let j = 0; j < data.length; j += 4) {
                const r = data[j];
                const g = data[j + 1];
                const b = data[j + 2];
                const closestColorIndex = findClosestColor([r, g, b]);
                colorCounts[closestColorIndex]++;
            }

            // If all images have been processed, update the color grid and show the download button
            if (i === totalFiles - 1) {
                // Calculate percentages
                const colorPercentages = colorCounts.map(count => (count / totalPixels));

                // Create color circles with percentages
                createColorCircles('colorGrid', colorPercentages);

                // Show the download button
                document.getElementById('downloadData').style.display = 'block';
            }
        };
    }
});

// Function to download data as an Excel file
document.getElementById('downloadData').addEventListener('click', () => {
    const colorData = rgbColors.map((color, index) => {
        const percentage = parseFloat(document.querySelector(`.colorCircle[data-percentage]:nth-child(${index + 1})`).getAttribute('data-percentage')) / 100;
        return {
            RGB: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            Percentage: percentage
        };
    }).sort((a, b) => b.Percentage - a.Percentage); // Sort by percentage in descending order

    const worksheet = XLSX.utils.json_to_sheet(colorData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Color Data');
    XLSX.writeFile(workbook, 'color_data.xlsx');
});
