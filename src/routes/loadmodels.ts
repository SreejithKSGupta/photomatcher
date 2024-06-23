// src/routes/load-models.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
    const modelUrls = [
        '/models/ssd_mobilenetv1_model-weights_manifest.json',
        '/models/face_landmark_68_model-weights_manifest.json',
        '/models/face_recognition_model-weights_manifest.json'
    ];

    try {
        await Promise.all(modelUrls.map(url => fetch(url)));
        return new Response('Models loaded', { status: 200 });
    } catch (error) {
        return new Response('Failed to load models', { status: 500 });
    }
};
