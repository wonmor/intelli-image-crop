# intelli-image-crop
Intelli Image Crop intelligently removes white spaces from raster images. For Javascript and Typescript users.

[![npm version](https://badge.fury.io/js/intelli-image-crop.svg)](https://badge.fury.io/js/intelli-image-crop)

---

<img width="500" alt="Screenshot-1" src="https://github.com/wonmor/intelli-image-crop/assets/35755386/a06027f0-3ebc-4ed2-a0cf-a11f685b92bc" />

---

## Usage

1. Import the module...
```javascript
const removeImageBlanks = require('intelli-image-crop'); // Legacy Javascript
import removeImageBlanks from 'intelli-image-crop'; // Modern Javascript (React)
```

2. Usage example...
```javascript
const imageObject = ...; // Your image object
const padding = 10; // Padding value
const cornerRadius = 20; // Corner radius value

const result = removeImageBlanks(imageObject, padding, cornerRadius);
```

3. Make sure the ```imageObject``` is rasterized (in pixels, not vectors) before you begin...
```javascript
// Rasterize the canvas
const rasterizedCanvas = document.createElement("canvas");

// Make SURE you mutiply the width and height with the DPR (Device Pixel Ratio)
// for support on high-resolution displays!
rasterizedCanvas.width = viewerCanvas.offsetWidth * window.devicePixelRatio;
rasterizedCanvas.height = viewerCanvas.offsetHeight * window.devicePixelRatio;

const rasterizedContext = rasterizedCanvas.getContext("2d");

rasterizedContext.drawImage(viewerCanvas, 0, 0);
```

