var fs = require('fs')
var Vision = require('@google-cloud/vision')

require('dotenv').config()

var vision = Vision()


function detectFaces (inputFile, callback) {
  // Make a call to the Vision API to detect the faces
  const request = { source: { filename: inputFile } };
  vision.faceDetection(request)
    .then((results) => {
      const faces = results[0].faceAnnotations;
      var numFaces = faces.length;
      console.log('Found ' + numFaces + (numFaces === 1 ? ' face' : ' faces'));
      callback(null, faces);
    })
    .catch((err) => {
      console.error('ERROR:', err);
      callback(err);
    });
}

function main (inputFile, outputFile, Canvas, callback) {
  outputFile = outputFile || 'out.png';
  detectFaces(inputFile, (err, faces) => {
    if (err) {
      return callback(err);
    }

    // console.log('Highlighting...');
    // highlightFaces(inputFile, faces, outputFile, Canvas, (err) => {
    //   if (err) {
    //     return callback(err);
    //   }
    //   console.log('Finished!');
    //   callback(null, faces);
    // });
  });
}
main('./teste-de-ai.jpg')
