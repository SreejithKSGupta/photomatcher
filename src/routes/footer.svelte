<script lang="ts">
    const socialLinks = [
        {
            href: "https://github.com/SreejithKSGupta",
            imgSrc: "/icons/github.png",
            alt: "GitHub"
        },
        {
            href: "https://www.linkedin.com/in/sreejith-k-s-gupta/",
            imgSrc: "/icons/linkedin.webp",
            alt: "LinkedIn"
        },
        {
            href: "https://myportfolio-8fi.pages.dev/",
            imgSrc: "/icons/portfolio.png",
            alt: "Portfolio"
        }
    ];

    const projects = [
        {
            href: "https://asastech.in",
            name: "ASA Tech"
        },
        {
            href: "https://home5559.vercel.app/",
            name: "Home Page"
        },
        {
            href: "https://sreejithksgupta.github.io/FastFingers/",
            name: "Fast Fingers Typing Game"
        },
        {
            href: "https://sreejithksgupta.github.io/MyBooks/",
            name: "MyBooks - Book Search"
        }
    ];
</script>

<footer>
        <div class="row">
            {#each socialLinks as { href, imgSrc, alt }}
                <a href={href} target="_blank" rel="noopener noreferrer">
                    <img src={imgSrc} alt={alt} />
                </a>
            {/each}
        </div>
        <div class="column">
            <div class="column" >
               <p> made with </p>
                <p class="red">&#10084;</p> 
                 <a href="https://github.com/SreejithKSGupta">by Sreejith KS</a>
            </div>
        </div>
        <div class="column">
            <ul>
                {#each projects as { href, name }}
                    <li>
                        <a href={href} target="_blank" rel="noopener noreferrer">{name}</a>
                    </li>
                {/each}
            </ul>
        </div>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 12vh;
        width: 100%;
        background-color: rgb(0, 32, 73);
        padding: 0px 50px;
        color: white;
    }



    .red{
        color: red;
        font-size: 20px;
        font-weight: 700;
    }
    
    img {
        width: 40px;
        height: 40px;
        margin: 10px;
        background-color: #fff;
        border-radius: 50%;
    }


    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

   a {
        color: #fff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
