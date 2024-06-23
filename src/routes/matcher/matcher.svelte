<script lang="ts">
    import { onMount } from "svelte";
    import * as faceapi from "face-api.js";
    let searchFile: File;
    let previewSrc = "";
    let matches: { filename: string; matchPercentage: number }[] = [];

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

    onMount(() => {
        loadModels();
    });

    async function handleSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            searchFile = input.files[0];
            previewSrc = URL.createObjectURL(searchFile);
            console.log("Search file:", searchFile);
        }
    }

    async function getFaceFeatures(image: HTMLImageElement) {
        const detections = await faceapi
            .detectSingleFace(image)
            .withFaceLandmarks()
            .withFaceDescriptor();
        if (!detections) {
            console.log("No face detected");
            return null;
        }
        return detections.descriptor;
    }

    async function submitSearch() {
        if (!searchFile) {
            alert("Please select a file to search.");
            return;
        }
        const image = await faceapi.bufferToImage(searchFile);
        const searchDescriptor = await getFaceFeatures(image);
        if (!searchDescriptor) {
            alert("No face detected in the search image.");
            return;
        }
        matches = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("faceFeatures_")) {
                const storedDataStr = localStorage.getItem(key);
                if (storedDataStr) {
                    const storedData = JSON.parse(storedDataStr);
                    const storedDescriptor = storedData.faceFeatures.descriptor;
                    const distance = faceapi.euclideanDistance(
                        searchDescriptor,
                        storedDescriptor,
                    );
                    const matchPercentage = ((1 - distance) * 100).toFixed(2); // Convert distance to percentage
                    if (Number(matchPercentage) > 0) {
                        matches.push({
                            filename: storedData.filename,
                            matchPercentage: parseFloat(matchPercentage),
                        });
                    }
                }
            }
        }

        matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }
</script>

<div id="viewbox" class="row">
    <h2>Matched Images</h2>
    {#if matches.length > 0}
        <ul>
            {#each matches as match}
                <li>
                    <img
                        src={`/uploads/${match.filename}`}
                        alt="Matched items"
                    />
                    <p>{match.filename} - {match.matchPercentage}%</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No matches found.</p>
    {/if}
</div>

<section class="row">
    <h2>Upload Images</h2>
    <div class="upload-container">
        <label for="file-input">
            <input
                type="file"
                id="file-input"
                accept="image/*"
                on:change={handleSearch}
            />
            <span>Select Images</span>
        </label>
        <button type="button" on:click={submitSearch}>Upload</button>
    </div>
    <div class="preview-box">
        {#if previewSrc}
            <img src={previewSrc} alt="upload Preview" />
        {/if}
    </div>
</section>

<style>
    #viewbox {
        height: 70%;
        width: 100%;
        flex-wrap: wrap;
    }

    section {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        height: 30%;
        text-align: center;
    }
    h2 {
        width: 100%;
        text-align: center;
    }
    .preview-box {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 0.2rem;
        height: 80%;
        width: 50%;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .preview-box img {
        max-width: 80%;
        height: auto;
        border-radius: 4px;
        margin: 0.5rem;
    }
    .preview-box::-webkit-scrollbar {
        width: 8px;
    }
    .preview-box::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
    }
    .preview-box::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .upload-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
    }

    .upload-container label {
        display: inline-block;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background-color: var(--accent-color);
    }

    .upload-container label:hover {
        background-color:var(--primary-dark-color);
    }

    .upload-container input[type="file"] {
        display: none;
    }

    .upload-container button {
        cursor: pointer;
        opacity: 0.7;
    }

    .upload-container button:hover {
        opacity: 1;
    }

    .upload-container button:disabled {
        opacity: 0.5;
        cursor: default;
    }
</style>
