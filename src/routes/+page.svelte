<script lang="ts">
    import Matcher from "./matcher.svelte";
    import Uploader from "./uploader.svelte";
    import { loadModels } from "$lib/facematcher";
    import { onMount } from "svelte";
    onMount(() => {
        loadModels();
    });
</script>

<div class="content">
    <div class="contentpart card">
        <Uploader />
    </div>
    <div class="contentpart card">
        <Matcher />
    </div>
</div>

<style>
    .content {
        width: 100vw;
        height: 80vh;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: row;
    }
    .contentpart {
        width: 46vw;
        height: 78vh;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
    }
   
    @media screen and (max-width: 800px) {
       .content {
            flex-direction: column;
            height: auto;
        }
       .contentpart {
            width: 94vw;
            height: auto;
            margin: 3vw;
            padding: 5px;
        }
    }

</style>
