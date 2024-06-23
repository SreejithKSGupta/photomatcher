<script lang="ts">
    import { matches } from "$lib/facematcher";
    $:matchess = $matches
</script>

<div id="viewbox" class="masonry">
    {#if matchess.length > 0}
        {#each matchess as match}
            {#if match.matchPercentage > 50}
                <div class="image-container">
                    <img
                        src={`/userimages/${match.filename}`}
                        alt={match.filename}
                        class="overlay-image"
                    />
                    <div class="overlay-text row">
                        <p>{match.filename}</p>
                        <div class="percentage-circle">
                            <p>{match.matchPercentage}%</p>
                        </div>
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
       flex-direction: row;
       flex-wrap: wrap;
       justify-content: space-evenly;
    }

    .image-container {
        position: relative;
        display: inline-block;
        overflow: hidden;
        border-radius: 5px;
        margin: 5px;
    }

    .overlay-image {
        display: block;
        width: 12vw; 
        height: auto; 
        border-radius: 5px;
        transition: transform 0.3s ease-in-out;
    }

    .overlay-text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        border-radius: 0 0 5px 5px;
        transition: opacity 0.3s ease-in-out;
        opacity: 1; 
        justify-content: space-between;
    }

    .overlay-text p {
        margin: 0;
    }

    .percentage-circle {
        display: inline-block;
        background-color: #ff7f50;
        color: white;
        text-align: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-left: 5px;
    }
</style>
