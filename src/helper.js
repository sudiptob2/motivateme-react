/*
    This helper component extracts the JSON response from the pexels 
    This funcion is redundant
    This function is written to help the extraction if the Imagedata changes in future
    Also smaller object is easy to debug
*/
import ImageData from "./ImageData";

let images = [];
let i;
for (i = 0; i < ImageData.length; i++) {
    images.push(imageData[i].src.large2x);
}

export default images;
