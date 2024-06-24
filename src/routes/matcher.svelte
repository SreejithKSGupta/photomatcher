<script lang="ts">
    import { matches } from "$lib/facematcher";
    import { fetchimage } from "$lib/saveimagedata";
    $: matchess = $matches;

    async function setImageUrl(filename: string) {
        await fetchimage(filename).then((imageUrl) => {
            const imgElement = document.getElementById(
                "image" + filename,
            ) as HTMLImageElement;
            if (imgElement && imageUrl) {
                imgElement.src = imageUrl;
            }
        });
    }
</script>

<div id="viewbox" class="masonry">
    {#if matchess.length > 0}
        {#each matchess as match}
            {#if match.matchPercentage > 50}
                <div class="image-container">
                    <img
                        id={"image" + match.filename}
                        src={"./userimages/mam1.jpg"}
                        alt={match.filename}
                        class="overlay-image"
                    />
                   <div style="display: none;"> {setImageUrl(match.filename)} </div> 
                    <div class="overlay-text row">
                        <p>{match.filename}</p>
                    </div>
                </div>
            {/if}
        {/each}
    {:else}
        <p>No matches found.</p>
    {/if}
</div>
<style>
#viewbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    gap: 20px;
}

.image-container {
    position: relative;
    width: calc(25% - 20px);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.image-container:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.overlay-image {
    width: 100%;
    height: 100%;
}

.overlay-text {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #ffffff;
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.801);
    padding: 5px;
}

.image-container:hover .overlay-text {
    opacity: 1;
}

@media (max-width: 1200px) {
    .image-container {
        width: calc(33.33% - 20px);
    }
}

@media (max-width: 768px) {
    .image-container {
        width: calc(50% - 20px);
    }
}

@media (max-width: 480px) {
    .image-container {
        width: calc(100% - 20px);
    }
}
</style>