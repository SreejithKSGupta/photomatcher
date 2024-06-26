<script lang="ts">
    import { getFaceFeatures, getDistance, matches } from "$lib/facematcher";
    import { saveimage } from "$lib/saveimagedata";

    let uploadFiles: File[] = [];
    let previewSrcs: string[] = [];
    let searchFile: File;
    let previewimg = "";
    export let matchess: { filename: string; matchPercentage: number }[] = [];

    async function handleUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            uploadFiles = Array.from(input.files);
            previewSrcs = uploadFiles.map((file) => URL.createObjectURL(file));
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
                saveimage(imageFile, imageFile.name);
            }
        }
    }

    async function handleSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            searchFile = input.files[0];
            previewimg = URL.createObjectURL(searchFile);
        }
    }

    async function submitSearch() {
        const resultdata = await getFaceFeatures(searchFile);
        if (!resultdata!.descriptor) {
            alert("No face detected in the search image.");
            return;
        }
        matchdata(resultdata?.descriptor);
    }

    async function matchdata(descriptor: any) {
        matchess = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("faceFeatures_")) {
                const storedDataStr = localStorage.getItem(key);
                if (storedDataStr) {
                    const storedData = JSON.parse(storedDataStr);
                    const storedDescriptor = storedData.faceFeatures.descriptor;
                    const distance = getDistance(descriptor, storedDescriptor);
                    const matchPercentage = ((1 - distance) * 100).toFixed(2);

                    if (Number(matchPercentage) > 0) {
                        matchess.push({
                            filename: storedData.filename,
                            matchPercentage: parseFloat(matchPercentage),
                        });
                    }
                }
            }
        }

        matchess.sort((a, b) => b.matchPercentage - a.matchPercentage);
        matches.set(matchess);
    }
</script>

<section class="row">
    <div class="upload-container column">
        <h2>Upload Images to Database</h2>
        <label for="file-upload" class="button">
            <input
                type="file"
                id="file-upload"
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
            {uploadFiles.length > 0 ? "upload" : "no files selected"}
        </button>
        <br />
    </div>
    <div class="preview-box">
        {#if previewSrcs.length > 0}
            {#each previewSrcs as src}
                <img {src} alt="Upload Preview" />
            {/each}
        {/if}
    </div>
</section>

<section class="row">
    <div class="upload-container column">
        <h2>Match Images from Database</h2>
        <label for="file-match" class="button">
            <input
                type="file"
                id="file-match"
                accept="image/*"
                on:change={handleSearch}
            />
            <span>Select Image</span>
        </label>
        <button type="button" disabled={!searchFile} on:click={submitSearch}>
            {searchFile ? "match" : "no file selected"}
        </button>
    </div>
    <div class="preview-box">
        {#if previewimg}
            <img src={previewimg} alt="upload Preview" />
        {/if}
    </div>
</section>

<style>
    section {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        height: 45%;
        text-align: center;
    }

    .preview-box {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 0.2rem;
        height: 95%;
        min-height: 200px;
        width: 50%;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .preview-box img {
        max-width: 90%;
        height: auto;
        border-radius: 4px;
        margin: 0.5rem;
    }

    .preview-box::-webkit-scrollbar {
        width: 8px;
    }

    .preview-box::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }

    .upload-container {
        width: 50%;
    }

    .upload-container input[type="file"] {
        display: none;
    }

    @media screen and (max-width:800px) {
        section {
        width: 100%;
        padding: 5px;
        margin: 5px;
        }
        .upload-container {
        width: 45%;
        margin: 5px;
    }
    h2 {
        font-size: 1.2rem;
    }
    }

</style>
