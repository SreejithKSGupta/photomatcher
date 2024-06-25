<script lang="ts">
    import { onMount } from "svelte";
    import { theme } from "$lib/theme";
    import Footer from "./footer.svelte";

    let themeText = $theme;
    let isDarkTheme = $theme == "dark" ? true : false;

    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        theme.update((current) => (current === "light" ? "dark" : "light"));
        themeText = isDarkTheme ? "dark" : "light";
        updateSliderImage();
    }

    function updateSliderImage() {
        const slider = document.querySelector(".slider:before") as HTMLElement;
        if (slider) {
            slider.style.backgroundImage = isDarkTheme
                ? "url('./icons/dark.webp')"
                : "url('./icons/light.webp')";
        }
    }

    onMount(() => {
        updateSliderImage();
    });
</script>

<header>
    <img src="./favicon.png" alt="logo" />
    <div id="heading">Face Matcher</div>
    <div class="theme-switch">
        <input
            type="checkbox"
            id="theme-toggle"
            on:change={toggleTheme}
            bind:checked={isDarkTheme}
        />
        <label class="slider" for="theme-toggle" aria-label="Toggle theme"
        ></label>
    </div>
</header>
<slot />
<Footer />

<style>
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 8vh;
        background-color: rgb(0, 32, 73);
        padding: 0px 20px;
        color: white;
    }

    header img {
        width: 6vh;
        height: 6vh;
        border-radius: 50%;
    }

    #heading {
        font-size: 4vh;
        font-weight: 600;
    }

    .theme-switch {
        display: inline-block;
        width: 50px;
        height: 25px;
        position: relative;
    }

    .theme-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 25px;
    }

    .slider:before {
        content: "";
        position: absolute;
        height: 21px;
        width: 21px;
        left: 2px;
        bottom: 2px;
        background-color: rgb(255, 255, 255);
        transition: 0.4s;
        border-radius: 50%;
        background-image: url("./icons/light.webp");
        background-size: cover;
    }

    input:checked + .slider {
        background-color: #2196f3;
    }

    input:checked + .slider:before {
        transform: translateX(25px);
        background-image: url("./icons/dark.webp");
    }

    @media screen and (max-width: 800px) {
        #heading {
        font-size: 2em;
        font-weight: 400;
    }
    }
</style>
