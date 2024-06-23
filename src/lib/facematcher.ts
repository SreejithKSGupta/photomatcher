import * as faceapi from "face-api.js";
import { onMount } from "svelte";
async function loadModels() {
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

    onMount(async () => {
        await loadModels();
    });    


export async function getFaceFeatures(image: HTMLImageElement) {
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

    return {
        landmarks: landmarks.positions,
        descriptor: Array.from(descriptor),
    };
}