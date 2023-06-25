module.exports = removeImageBlanks;

function removeImageBlanks(imageObject, padding, cornerRadius) {
    var imgWidth = imageObject.width;
    var imgHeight = imageObject.height;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', imgWidth);
    canvas.setAttribute('height', imgHeight);
    var context = canvas.getContext('2d');
    context.drawImage(imageObject, 0, 0);
  
    var imageData = context.getImageData(0, 0, imgWidth, imgHeight);
    var data = imageData.data;
    var getRGB = function(x, y) {
      var offset = imgWidth * y + x;
      return {
        red: data[offset * 4],
        green: data[offset * 4 + 1],
        blue: data[offset * 4 + 2],
        opacity: data[offset * 4 + 3]
      };
    };
    var isWhite = function(rgb) {
      // Many images contain noise, as the white is not a pure #fff white
      return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
    };
    var scanY = function(fromTop) {
      var offset = fromTop ? 1 : -1;
  
      // Loop through each row
      for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
  
        // Loop through each column
        for (var x = 0; x < imgWidth; x++) {
          var rgb = getRGB(x, y);
          if (!isWhite(rgb)) {
            if (fromTop) {
              return y;
            } else {
              return Math.min(y + 1, imgHeight);
            }
          }
        }
      }
      return null; // All image is white
    };
    var scanX = function(fromLeft) {
      var offset = fromLeft ? 1 : -1;
  
      // Loop through each column
      for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
  
        // Loop through each row
        for (var y = 0; y < imgHeight; y++) {
          var rgb = getRGB(x, y);
          if (!isWhite(rgb)) {
            if (fromLeft) {
              return x;
            } else {
              return Math.min(x + 1, imgWidth);
            }
          }
        }
      }
      return null; // All image is white
    };
  
    var cropTop = scanY(true);
    var cropBottom = scanY(false);
    var cropLeft = scanX(true);
    var cropRight = scanX(false);
    var cropWidth = cropRight - cropLeft;
    var cropHeight = cropBottom - cropTop;
  
    // Apply padding
    cropTop -= padding;
    cropBottom += padding;
    cropLeft -= padding;
    cropRight += padding;
  
    cropWidth = cropRight - cropLeft;
    cropHeight = cropBottom - cropTop;
  
    // Ensure cropped dimensions are within bounds
    cropTop = Math.max(cropTop, 0);
    cropBottom = Math.min(cropBottom, imgHeight);
    cropLeft = Math.max(cropLeft, 0);
    cropRight = Math.min(cropRight, imgWidth);
  
    cropWidth = cropRight - cropLeft;
    cropHeight = cropBottom - cropTop;
  
    // Create rounded canvas
    var roundedCanvas = document.createElement('canvas');
    roundedCanvas.width = cropWidth;
    roundedCanvas.height = cropHeight;
    var roundedContext = roundedCanvas.getContext('2d');
    roundedContext.beginPath();
    roundedContext.moveTo(cornerRadius, 0);
    roundedContext.lineTo(cropWidth - cornerRadius, 0);
    roundedContext.quadraticCurveTo(cropWidth, 0, cropWidth, cornerRadius);
    roundedContext.lineTo(cropWidth, cropHeight - cornerRadius);
    roundedContext.quadraticCurveTo(cropWidth, cropHeight, cropWidth - cornerRadius, cropHeight);
    roundedContext.lineTo(cornerRadius, cropHeight);
    roundedContext.quadraticCurveTo(0, cropHeight, 0, cropHeight - cornerRadius);
    roundedContext.lineTo(0, cornerRadius);
    roundedContext.quadraticCurveTo(0, 0, cornerRadius, 0);
    roundedContext.closePath();
    roundedContext.clip();
  
    // Draw cropped image onto rounded canvas
    roundedContext.drawImage(
      imageObject,
      cropLeft,
      cropTop,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
  
    return roundedCanvas.toDataURL();
  }