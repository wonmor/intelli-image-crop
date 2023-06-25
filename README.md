# intelli-image-crop
Intelli Image Crop intelligently removes white spaces from raster images. For Javascript and Typescript users.

---

## Usage

1. Import the module...
```
const removeImageBlanks = require('intelli-image-crop'); // Legacy Javascript
import removeImageBlanks from 'intelli-image-crop'; // Modern Javascript (React)
```

2. Usage example...
```
const imageObject = ...; // Your image object
const padding = 10; // Padding value
const cornerRadius = 20; // Corner radius value

const result = removeImageBlanks(imageObject, padding, cornerRadius);
```

3. Make sure the ```imageObject``` is rasterized (in pixels, not vectors) before you begin...
```
// Rasterize the canvas
const rasterizedCanvas = document.createElement("canvas");

rasterizedCanvas.width = viewerCanvas.offsetWidth;
rasterizedCanvas.height = viewerCanvas.offsetHeight;

const rasterizedContext = rasterizedCanvas.getContext("2d");

rasterizedContext.drawImage(viewerCanvas, 0, 0);
```

