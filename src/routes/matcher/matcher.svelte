<script lang="ts">
    let searchFile;
    let previewSrc = '';

    function submitSearch() {
        // Implement the logic to submit the search file
        alert("Searching for matches.");
    }
    function handleSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            searchFile = input.files[0];
            // Implement the logic for searching for matches using the uploaded image
            console.log("Search file:", searchFile);
        }
    }
</script>
<div id="viewbox">
    available images
</div>
    <section class="row">
        <h2>Search for Matches</h2>
        <input type="file" accept="image/*" on:change={handleSearch} />
        <button on:click={submitSearch}>Search</button>
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
        max-width: 100%;
        height: auto;
        border-radius: 4px;
    }
</style>
