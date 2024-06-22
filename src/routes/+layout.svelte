<script lang="ts">
import { theme } from '$lib/theme';
$: themetxr= 'dark';
function toggleTheme() {
  theme.update(current => (current === 'light' ? 'dark' : 'light'));
  theme.subscribe(current => {
    themetxr = current;
  }
)
}
</script>

<header>
<div id="logo">
    logo
</div>
<div id="heading">
    Face Matcher
</div>
<div id="themeswitch">
    <button on:click={toggleTheme}> {themetxr} </button>
</div>
</header>
<slot/>
<footer>
    made in love with svelte by sreejith KS
</footer>

<style>
header,footer{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    height: 10vh;
    background-color: rgb(0, 32, 73);
    padding: 0px 20px;
    color: white;
}
</style>