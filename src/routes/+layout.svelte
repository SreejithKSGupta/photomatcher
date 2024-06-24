<script lang="ts">
import { theme } from '$lib/theme';
import Footer from './footer.svelte';
let isDarkTheme = true;
$: themetxr= 'dark';
function toggleTheme() {
isDarkTheme = !isDarkTheme;
  theme.update(current => (current === 'light' ? 'dark' : 'light'));
  theme.subscribe(current => {
    themetxr = current;
  }
)
}
</script>

<header>
<img src="./favicon.png" alt="logo">
<div id="heading">
    Face Matcher
</div>
<div class="theme-switch">
    <input type="checkbox" title="{themetxr}" id="theme-toggle" on:change={toggleTheme} bind:checked={isDarkTheme}>
    <label class="slider" for="theme-toggle"></label>
</div>
</header>
<slot/>
<Footer/>

<style>
header{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
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
    position: absolute;
    content: "";
    height: 21px;
    width: 21px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    transform: translateX(25px);
}
</style>