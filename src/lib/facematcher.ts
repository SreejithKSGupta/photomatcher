import * as faceapi from "face-api.js";
import { writable } from "svelte/store";
interface Match {
    filename: string;
    matchPercentage: number;
  }
export async function loadModels() {
    try {
        const MODEL_URL = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
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

export let matches = writable<Match[]>([])