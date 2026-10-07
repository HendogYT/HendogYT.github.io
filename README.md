# HendogSMP website

The store and server page for HendogSMP: Hendog+ ranks, crate keys with open odds, a basket, and how to join. It is plain HTML, CSS and JavaScript, so it needs no build step and works on GitHub Pages as it is.

## Put it online with GitHub Pages (about 5 minutes)

1. Make a free account at github.com and press **New repository**. Name it, for example, `hendogsmp-website`. Set it to **Public** and press **Create repository**.
2. On the new repository page press **uploading an existing file**.
3. Unzip this folder on your computer. Open it, select **everything inside it** (the `index.html` file, the `assets` folder and the `README.md`), and drag it all into the GitHub upload box. `index.html` must end up at the top of the repository, not inside another folder.
4. Press **Commit changes**.
5. Open the repository **Settings**, then **Pages** in the left menu. Under **Branch** choose `main` and the folder `/ (root)`, then press **Save**.
6. Wait a minute or two and refresh that page. It shows your address, which looks like `https://YOUR-USERNAME.github.io/hendogsmp-website/`.

If the `.nojekyll` file did not upload (files starting with a dot are sometimes skipped), it still works. That file is optional.

## Use your own domain (for example hendogsmp.net or store.hendogsmp.net)

1. In **Settings > Pages**, type your domain under **Custom domain** and press **Save**.
2. At your domain registrar, add the DNS records GitHub shows you. They are listed in GitHub's guide "Managing a custom domain for your GitHub Pages site". For a subdomain like `store`, add a `CNAME` record pointing to `YOUR-USERNAME.github.io`.
3. When GitHub says the DNS check passed, tick **Enforce HTTPS**.

Do not point `hendogsmp.net` itself at GitHub if that name is also your Minecraft server address and you need it for the server. A subdomain such as `store.hendogsmp.net` is the safe choice.

## The settings you will want to change

Everything is in `assets/js/config.js`:

| Setting | What it does |
|---|---|
| `IP` | The server address shown on the page. |
| `DISCORD_URL` | Your Discord invite. The Join the Discord button and footer link appear when this is filled in. |
| `STORE_URL` | Your Tebex or CraftingStore page. The basket's **Continue to payment** button opens it. Until you fill this in, the button says payments are not connected. |
| `TERMS_URL`, `PRIVACY_URL` | Footer links (hidden while empty). |
| `RANKS` | The three rank cards: name, badge, price in cents (`299` means $2.99), color and perks. |

You can edit files straight on GitHub: open the file, press the pencil icon, change it and press **Commit changes**. The site updates within a minute.

## Other files

| File | What it is |
|---|---|
| `index.html` | The page itself. |
| `assets/css/style.css` | All the styling. The colors are the variables at the top (`:root`). |
| `assets/js/app.js` | The basket, the loot windows and the copy buttons. |
| `assets/js/crates-data.js` | Every crate's rewards with exact odds, and the key prices (`price` is `[1 key, 5 keys, 10 keys]`). If you change a crate on the server, change it here too so the page stays truthful. |
| `assets/img/` | Your logo and the server screenshots. Replace a file with a new one of the same name to change a picture. |
| `assets/fonts/` | The Fredoka and Nunito fonts (SIL Open Font License), included so the page looks the same for everyone. |

## How payments work

This site cannot take payments itself. The basket collects what the visitor wants and their Minecraft username, then sends them to your store page, where they pay. Your store then runs the in-game commands that deliver the purchase, for example:

```
plus grant {username} 2                      (Hendog++)
plus remove {username}                       (when the subscription ends)
crate givekey {username} void 5              (5 Void keys)
purchase {username} keys "5x Void Key"       (the server-wide announcement and W wave)
```

## Not affiliated

The footer says HendogSMP is not an official Minecraft product and is not approved by or associated with Mojang or Microsoft. Keep that line.
