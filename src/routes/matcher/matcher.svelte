<script lang="ts">
    let uploadFile;
    let searchFile;

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

<div>
    <section>
        <h2>Search for Matches</h2>
        <input type="file" accept="image/*" on:change={handleSearch} />
        <button on:click={submitSearch}>Search</button>
    </section>
</div>

<style>
</style>
