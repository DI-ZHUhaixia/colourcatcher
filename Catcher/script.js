// RGB to HEX conversion function
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// List of colors in BGR order
const bgrColors = [
    [32,0,208],[0,156,255],[0,217,255],[0,220,176],[71,149,0],[113,140,0],[136,108,0],[152,33,0],[143,48,132],[122,0,192],
    [16,28,184],[0,128,216],[0,171,209],[4,187,151],[91,155,57],[118,139,52],[133,119,54],[141,96,54],[139,73,131],[131,69,186],
    [86,88,255],[40,168,255],[40,216,255],[32,224,184],[125,204,72],[170,202,96],[206,189,91],[223,176,138],[205,135,194],[184,143,239],
    [136,152,255],[104,188,255],[122,229,255],[109,248,218],[173,247,157],[203,231,152],[233,222,150],[255,216,191],[255,202,242],[226,196,255],
    [200,211,255],[159,213,255],[191,242,255],[181,255,238],[213,255,218],[236,255,213],[255,253,217],[255,236,225],[255,225,247],[237,225,255],
    [176,180,208],[159,181,206],[156,191,205],[156,205,198],[164,198,168],[188,196,166],[191,188,170],[200,186,179],[199,184,197],[196,186,207],
    [122,128,237],[96,157,232],[99,200,228],[89,208,179],[149,205,135],[184,200,128],[184,173,112],[186,153,133],[201,156,188],[173,149,219],
    [143,147,184],[119,143,176],[109,157,171],[104,164,152],[134,170,132],[150,156,126],[156,152,124],[157,140,130],[159,138,154],[145,129,165],
    [96,104,168],[72,119,176],[64,132,149],[66,145,129],[107,145,102],[124,131,82],[142,130,85],[149,120,102],[152,112,136],[126,102,166],
    [34,0,168],[0,84,168],[0,136,160],[0,136,105],[62,117,0],[94,104,0],[123,99,0],[117,50,0],[117,0,102],[82,0,136],
    [31,0,104],[0,60,119],[0,92,112],[0,96,79],[40,81,0],[69,72,0],[91,71,0],[102,38,0],[96,0,84],[67,0,106],
    [24,0,64],[0,32,64],[0,51,60],[0,53,43],[27,53,0],[60,60,0],[68,51,0],[77,29,0],[72,0,64],[52,0,85],
    [255,255,255],[226,238,238],[187,199,199],[148,161,161],[131,143,143],[117,128,128],[98,107,107],[70,76,76],[42,46,46],[0,0,0]
];

// Reorder BGR to RGB
const rgbColors = bgrColors.map(color => [color[2], color[1], color[0]]);

// Function to create and display color circles
function createColorCircles(containerId, colorPercentages = null) {
    const colorGrid = document.getElementById(containerId);

    // Clear the color grid
    colorGrid.innerHTML = '';

    // Create color circles and add them to the grid
    rgbColors.forEach((color, index) => {
        const hexColor = rgbToHex(...color);
        const colorCircle = document.createElement('div');
        colorCircle.className = 'colorCircle';
        colorCircle.style.backgroundColor = hexColor;

        if (colorPercentages) {
            const percentage = colorPercentages[index] || 0;
            const size = 50 * percentage * 10; // Scale size based on percentage
            colorCircle.style.width = `${size}px`;
            colorCircle.style.height = `${size}px`;
            colorCircle.setAttribute('data-percentage', `${(percentage * 100).toFixed(2)}%`);
        }

        // Add click event to copy hex color to clipboard
        colorCircle.addEventListener('click', () => {
            navigator.clipboard.writeText(hexColor).then(() => {
                alert(`Copied ${hexColor} to clipboard!`);
            });
        });

        colorGrid.appendChild(colorCircle);
    });
}

// Call this function to create color circles on the main page
if (document.getElementById('colorGrid')) {
    createColorCircles('colorGrid');
}
