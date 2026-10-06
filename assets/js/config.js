/*
  HendogSMP store settings. This is the file you edit.

  IP .............. the server address shown on the page
  DISCORD_URL ..... your Discord invite link (the Join the Discord button appears when this is filled in)
  STORE_URL ....... your Tebex / CraftingStore page. The basket sends people there to pay.
  TERMS_URL / PRIVACY_URL ... links for the footer (hidden while empty)

  RANKS ........... the rank cards: name, badge, price in CENTS (299 = $2.99), color and the perk list
*/
var CFG = {
  IP: "hendogsmp.net",
  DISCORD_URL: "",   // e.g. "https://discord.gg/yourinvite"
  STORE_URL: "",     // e.g. "https://hendogsmp.tebex.io"
  TERMS_URL: "",
  PRIVACY_URL: ""
};
var RANKS=[
 {id:"plus",name:"Hendog+",badge:"+",cents:299,color:"#FFD54F",perks:["A + badge by your name in chat and the tab list","Set a nickname with /nick","Listed above regular players in the tab list","Helps pay for the server"]},
 {id:"plus2",name:"Hendog++",badge:"++",cents:499,color:"#FFAB40",perks:["A ++ badge by your name in chat and the tab list","Set a nickname with /nick","Listed above Hendog+ in the tab list","Helps pay for the server"]},
 {id:"plus3",name:"Hendog+++",badge:"+++",cents:999,color:"#FF7043",perks:["A +++ badge by your name in chat and the tab list","Set a nickname with /nick","Listed at the top of the supporters in the tab list","Helps pay for the server"]}];
