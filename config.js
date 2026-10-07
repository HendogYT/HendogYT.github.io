/*
  HendogSMP store settings. This is the file you edit.

  IP .............. the server address shown on the page
  DISCORD_URL ..... your Discord invite link (the Join the Discord button appears when this is filled in)
  STORE_URL ....... your Tebex / CraftingStore page. The basket sends people there to pay.
  TERMS_URL / PRIVACY_URL ... links for the footer (hidden while empty)

  RANKS ........... the rank cards: name, badge, price in CENTS (299 = $2.99), color and the perk list
*/
var CFG = {
  IP: "hendogsmp.com",
  DISCORD_URL: "",   // e.g. "https://discord.gg/yourinvite"
  STORE_URL: "",     // e.g. "https://hendogsmp.tebex.io"
  TERMS_URL: "",
  PRIVACY_URL: ""
};
var RANKS=[
 {id:"plus",name:"Hendog+",badge:"+",cents:299,color:"#FFD54F",perks:[
  "A + badge by your name in chat and the tab list",
  "Your own aura: sparkles, hearts, music and more (/aura)",
  "Shorter teleport countdown (3s instead of 5s) and /rtp wait (3 min)",
  "6 auction listings and 6 orders (instead of 3), 4 homes",
  "/craft, /trash and /sit anywhere",
  "Set a nickname with /nick",
  "Helps pay for the server"]},
 {id:"plus2",name:"Hendog++",badge:"++",cents:499,color:"#FFAB40",perks:[
  "A ++ badge, listed above Hendog+ in the tab list",
  "Everything in Hendog+, plus:",
  "More auras: flames, soul fire, lightning, cherry petals, colours and denser particles",
  "More shapes: spiral and orbit",
  "Teleport countdown 2s, /rtp wait 90s",
  "10 auction listings and 10 orders, 8 homes",
  "/ec and /anvil anywhere, bigger /trash, shorter command wait"]},
 {id:"plus3",name:"Hendog+++",badge:"+++",cents:999,color:"#FF7043",perks:[
  "A +++ badge, at the top of the supporters in the tab list",
  "Everything in Hendog++, plus:",
  "Every aura: totem, void, fireworks, rainbow and colour fade, with any colour you like",
  "Wings and trail shapes",
  "Teleport countdown 1s, /rtp wait 30s",
  "16 auction listings and 16 orders, 15 homes",
  "Grindstone, stonecutter, loom, smithing and cartography anywhere, full-size /trash, no command wait"]}];
