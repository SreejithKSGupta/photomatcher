<script lang="ts">
    let uploadFile;
    let searchFile;

    function handleUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            uploadFile = input.files[0];
            // Implement the logic for uploading the image to the server or processing it
            console.log("Uploaded file:", uploadFile);
        }
    }

    function submitUpload() {
        // Implement the logic to submit the upload file
        alert("Image uploaded for face recognition.");
    }
</script>

<main>
    <h1>Face Recognition System</h1>

    <section>
        <h2>Upload Image</h2>
        <input type="file" accept="image/*" on:change={handleUpload} />
        <button on:click={submitUpload}>Upload</button>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
    }
    section {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
        text-align: center;
    }
    h2 {
        margin-bottom: 1rem;
    }
    input[type="file"] {
        margin-bottom: 1rem;
    }
</style>
