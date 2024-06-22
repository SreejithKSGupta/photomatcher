<script lang="ts">
    let uploadFile;
    let previewSrc = '';

    function handleUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            uploadFile = input.files[0];
            previewSrc = URL.createObjectURL(uploadFile);
            console.log("Uploaded file:", uploadFile);
        }
    }

    function submitUpload() {
        // Implement the logic to submit the upload file
        alert("Image uploaded for face recognition.");
    }
</script>

    <div id="viewbox">
        available images
    </div>

    <section class="row">
        <h2>Upload Image</h2>
        <input type="file" accept="image/*" on:change={handleUpload} />
        <button on:click={submitUpload}>Upload</button>
        {#if previewSrc}
           <div class="preview-box">
              <img src={previewSrc} alt="upload Preview" />
           </div>
       {/if}
    </section>

<style>
    #viewbox{
        height: 70%;
        width: 100%;
    }
    section {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        height: 30%;
        text-align: center;
    }
    h2 {
        margin-bottom: 1rem;
        width: 100%;
        text-align: center;
    }
    input[type="file"] {
        margin-bottom: 1rem;
    }
    .preview-box {
        margin-top: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 0.5rem;
        height: 80%;
    }
    .preview-box img {
        max-height: 100%;
        width: auto;
        border-radius: 4px;
    }
</style>
