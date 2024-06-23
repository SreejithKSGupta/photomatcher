import * as faceapi from "face-api.js";
export async function loadModels() {
    try {
        const MODEL_URL = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        console.log("Models loaded");
    } catch (error) {
        console.error("Error loading models:", error);
    }
}


export     async function getFaceFeatures(imageFile: Blob) {
    const image = await faceapi.bufferToImage(imageFile);
    const detections = await faceapi.detectSingleFace(image)
                                   .withFaceLandmarks()
                                   .withFaceDescriptor();
    
    if (!detections) {
        console.log("No face detected");
        return null;
    }
    
    const { landmarks, descriptor } = detections;
    console.log("Facial Landmarks:", landmarks.positions);
    console.log("Face Descriptor:", Array.from(descriptor));
   let  resultdata = {
        landmarks: landmarks.positions,
        descriptor: Array.from(descriptor),
    }
    return  resultdata;
}

export function getDistance (disc1: Float32Array | number[], disc2: Float32Array | number[]): number {
    const distance = faceapi.euclideanDistance(
        disc1,
        disc2,
    );
    return distance;
}