<script lang="ts">
    import { onMount } from "svelte";
    import { getFaceFeatures, loadModels } from "../facematcher";

    let uploadFiles: File[] = [];
    let previewSrcs: string[] = [];



    onMount(() => {
        loadModels();
    });

    async function handleUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            uploadFiles = Array.from(input.files);
            previewSrcs = uploadFiles.map((file) => URL.createObjectURL(file));
            console.log("Uploaded files:", uploadFiles);
        }
    }


    async function submitUpload() {
        for (const imageFile of uploadFiles) {
            
            const faceFeatures = await getFaceFeatures(imageFile);
            if (faceFeatures) {
                const storedData = {
                    filename: imageFile.name,
                    faceFeatures,
                };
                localStorage.setItem(
                    `faceFeatures_${imageFile.name}`,
                    JSON.stringify(storedData),
                );
            }
        }
    }
</script>

<div id="viewbox" class="row">
    Available images
</div>

<section class="row">
    <h2>Upload Images</h2>
    <div class="upload-container">
        <label for="file-input" class="button">
            <input
                type="file"
                id="file-input"
                accept="image/*"
                multiple
                on:change={handleUpload}
            />
            <span>Select Images</span>
        </label>
        <button
            type="button"
            on:click={submitUpload}
            disabled={!uploadFiles.length}
        >
            Upload
        </button>
    </div>
    <div class="preview-box">
        {#if previewSrcs.length > 0}
            {#each previewSrcs as src}
                <img {src} alt="Upload Preview" />
            {/each}
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

    .upload-container input[type="file"] {
        display: none;
    }

</style>
