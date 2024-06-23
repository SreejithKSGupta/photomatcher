<script lang="ts">
    //  import {matches} from "../uploader/uploader.svelte"
    let matches: { filename: string; matchPercentage: number }[] = [];

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


<style>
    #viewbox {
        height: 70%;
        width: 100%;
        flex-wrap: wrap;
    }

    h2 {
        width: 100%;
        text-align: center;
    }
</style>
