/* HendogSMP store - the page logic (basket, loot windows, copy IP). Settings are in config.js. */
/* ------------------------------------------------------------ helpers */
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function cents(s){return Math.round(parseFloat(String(s).replace("$",""))*100)} function money(c){return "$"+(c/100).toFixed(2)}
var PACKS=[1,5,10],DOT={money:"#FFC400",stars:"#FFEB3B",item:"#90A4AE",tool:"#4DD0E1",super:"#FFD600",gear:"#B388FF"},SETC={voidwalker:"#B388FF",emberforged:"#FF8A50",tidecaller:"#4DD0E1",stoneheart:"#81C784"};
function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
var tt;function toast(t){var e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){e.classList.remove("on")},1900)}
/* ------------------------------------------------------------ address + links */
$("ipt").textContent=CFG.IP;$("ipcode").textContent=CFG.IP;
function copyText(){if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(CFG.IP).catch(function(){});else{var t=document.createElement("textarea");t.value=CFG.IP;document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(e){}t.remove()}}
function flash(btn,label,done){copyText();var o=btn.innerHTML;btn.textContent="Copied!";btn.setAttribute("data-ok","");setTimeout(function(){btn.innerHTML=o;btn.removeAttribute("data-ok")},1500)}
$("ipb").addEventListener("click",function(){var s=$("ipc"),o=s.textContent;copyText();s.textContent="Copied!";this.setAttribute("data-ok","");var b=this;setTimeout(function(){s.textContent=o;b.removeAttribute("data-ok")},1500)});
["ip2","ip3"].forEach(function(i){$(i).addEventListener("click",function(){var b=this,o=b.textContent;copyText();b.textContent="Copied!";setTimeout(function(){b.textContent=o},1500)})});
function link(i,u){var a=$(i);if(u){a.href=u;a.target="_blank";a.rel="noopener"}else a.style.display="none"}
link("discord",CFG.DISCORD_URL);link("f-discord",CFG.DISCORD_URL);link("f-terms",CFG.TERMS_URL);link("f-privacy",CFG.PRIVACY_URL);
/* ------------------------------------------------------------ ranks */
function renderRanks(){$("ranks-grid").innerHTML=RANKS.map(function(r){return '<article class="rank" style="--c:'+r.color+'"><div class="bdg">'+esc(r.badge)+'</div><h3>'+esc(r.name)+'</h3><div class="price">'+money(r.cents)+' <small>/ month</small></div><p class="bill">Billed monthly</p><ul>'+r.perks.map(function(p){return "<li>"+esc(p)+"</li>"}).join("")+'</ul><button class="btn" type="button" data-rank="'+r.id+'">Add to basket</button></article>'}).join("")}
/* ------------------------------------------------------------ key packs */
var sel={};function crates(){return DATA.filter(function(c){return c.price})}
function teaser(c){return c.loot.slice().sort(function(a,b){return a.c-b.c}).filter(function(x){return x.k!=="money"&&x.k!=="stars"}).slice(0,3).map(function(x){return x.n})}
function renderPacks(){var h="";crates().forEach(function(c){var p=c.price.map(cents),u=p[0],i=sel[c.id]||0,n=PACKS[i];
  var seg=PACKS.map(function(n2,j){var sv=j?Math.round(100-100*p[j]/(u*n2)):0;return '<button type="button" role="radio" aria-checked="'+(j===i)+'" data-pack="'+c.id+':'+j+'">'+n2+(n2>1?" keys":" key")+(sv?"<small>save "+sv+"%</small>":"<small>&nbsp;</small>")+"</button>"}).join("");
  h+='<article class="pack" style="--c:'+c.color+'"><div class="stage"><div class="crate3d"><i class="top2"></i><i class="front"></i><i class="side"></i><i class="sd"></i></div></div><div class="pbody"><h3>'+esc(c.name)+' crate</h3><p class="desc">'+esc(c.desc)+'</p><div class="tags">'+teaser(c).map(function(t){return "<span>"+esc(t)+"</span>"}).join("")+'</div>'+
   '<div class="seg" role="radiogroup" aria-label="Pack size for '+esc(c.name)+'">'+seg+'</div><div class="prow"><span class="pp">'+money(p[i])+'</span><span class="per">'+money(Math.round(p[i]/n))+' per key</span></div>'+
   '<div class="acts"><button class="btn alt sm" type="button" data-loot="'+c.id+'">View loot</button><button class="btn sm" type="button" data-add="'+c.id+'">Add to basket</button></div></div></article>'});$("packs").innerHTML=h}
$("packs").addEventListener("click",function(e){var b=e.target.closest("[data-pack]");if(b){var a=b.getAttribute("data-pack").split(":");sel[a[0]]=+a[1];renderPacks();return}var ad=e.target.closest("[data-add]");if(ad)addKey(ad.getAttribute("data-add"))});
$("ranks-grid").addEventListener("click",function(e){var b=e.target.closest("[data-rank]");if(b)addRank(b.getAttribute("data-rank"))});
/* ------------------------------------------------------------ loot dialog */
var lastF;function openLoot(id){var c=DATA.filter(function(x){return x.id===id})[0];if(!c)return;lastF=document.activeElement;
  var h='<div class="lh" style="--c:'+c.color+'"><h3 id="lt">'+esc(c.name)+(c.price?" crate":"")+'</h3><button class="x" type="button" id="lclose" aria-label="Close">&times;</button></div><p class="sub">'+esc(c.desc)+'</p><ul class="loot">';
  c.loot.forEach(function(r){var col=r.k==="gear"?SETC[r.s]:DOT[r.k];h+='<li><i class="dot" style="--d:'+col+'"></i><span class="nm">'+esc(r.n)+(r.k==="tool"&&r.s?"<small>"+esc(r.s)+"</small>":"")+(r.k==="gear"?"<small>"+esc(r.s.charAt(0).toUpperCase()+r.s.slice(1))+" set</small>":"")+'</span><span class="pc'+(r.c<3?" rare":"")+'">'+r.c+'%</span></li>'});
  $("sheet").innerHTML=h+"</ul>";$("veil").classList.add("on");$("veil").setAttribute("aria-hidden","false");$("lclose").focus();$("lclose").addEventListener("click",closeLoot)}
function closeLoot(){$("veil").classList.remove("on");$("veil").setAttribute("aria-hidden","true");if(lastF)lastF.focus()}
$("veil").addEventListener("click",function(e){if(e.target===$("veil"))closeLoot()});document.addEventListener("click",function(e){var b=e.target.closest("[data-loot]");if(b)openLoot(b.getAttribute("data-loot"))});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeLoot();closeBasket()}});
/* ------------------------------------------------------------ basket (key packs and ONE rank) */
var basket=store("hendog_basket2")||[];if(!Array.isArray(basket))basket=[];
function crate(id){return DATA.filter(function(x){return x.id===id})[0]}function rank(id){return RANKS.filter(function(x){return x.id===id})[0]}
function line(l){if(l.t==="rank"){var r=rank(l.id);return r?{rank:r,sum:r.cents,unit:r.cents,n:1}:null}var c=crate(l.id);if(!c||!c.price)return null;var p=cents(c.price[l.pack]);return {c:c,n:PACKS[l.pack],unit:p,sum:p*l.qty}}
function saveB(){store("hendog_basket2",basket);renderBasket()}function bump(){var b=$("bk");b.animate&&b.animate([{transform:"scale(1)"},{transform:"scale(1.12)"},{transform:"scale(1)"}],{duration:260})}
function addKey(id){var j=sel[id]||0,f=basket.filter(function(l){return l.t==="key"&&l.id===id&&l.pack===j})[0];if(f)f.qty=Math.min(99,f.qty+1);else basket.push({t:"key",id:id,pack:j,qty:1});saveB();toast("Added to your basket");bump()}
function addRank(id){var had=basket.filter(function(l){return l.t==="rank"})[0];basket=basket.filter(function(l){return l.t!=="rank"});basket.push({t:"rank",id:id,qty:1});saveB();toast(had&&had.id!==id?"Rank changed in your basket":"Added to your basket");bump()}
function renderBasket(){basket=basket.filter(function(l){return line(l)});var h="",t=0,n=0,hasRank=false;
  basket.forEach(function(l,i){var d=line(l);t+=d.sum;n+=l.t==="rank"?1:l.qty;
    if(l.t==="rank"){hasRank=true;h+='<div class="li"><div><b style="color:'+d.rank.color+'">'+esc(d.rank.name)+'</b><br><small>Monthly rank, renews each month</small></div><div class="lp">'+money(d.sum)+'</div><div></div><button class="rm" type="button" data-rm="'+i+'">Remove</button></div>'}
    else h+='<div class="li"><div><b style="color:'+d.c.color+'">'+esc(d.c.name)+' crate</b><br><small>'+d.n+(d.n>1?" keys":" key")+' pack, '+money(d.unit)+' each</small></div><div class="lp">'+money(d.sum)+'</div><div class="qty"><button type="button" data-q="'+i+':-1" aria-label="One less">-</button><span>'+l.qty+'</span><button type="button" data-q="'+i+':1" aria-label="One more">+</button></div><button class="rm" type="button" data-rm="'+i+'">Remove</button></div>'});
  $("dl").innerHTML=h||'<p class="empty">Your basket is empty. Pick a rank or a key pack.</p>';$("total").textContent=money(t);$("count").textContent=n;$("checkout").disabled=!basket.length;$("nt").textContent=hasRank?"The rank renews monthly at its price until you cancel.":""}
$("dl").addEventListener("click",function(e){var q=e.target.closest("[data-q]"),r=e.target.closest("[data-rm]");if(q){var a=q.getAttribute("data-q").split(":"),l=basket[+a[0]];l.qty+=+a[1];if(l.qty<1)basket.splice(+a[0],1);else if(l.qty>99)l.qty=99;saveB()}if(r){basket.splice(+r.getAttribute("data-rm"),1);saveB()}});
function openBasket(){$("drawer").classList.add("on");$("drawer").setAttribute("aria-hidden","false");setTimeout(function(){$("mcname").focus()},260)}function closeBasket(){$("drawer").classList.remove("on");$("drawer").setAttribute("aria-hidden","true")}
$("bk").addEventListener("click",openBasket);$("dclose").addEventListener("click",closeBasket);$("mcname").value=store("hendog_name")||"";
$("checkout").addEventListener("click",function(){var u=$("mcname").value.trim(),m=$("msg");m.className="msg";
  if(!/^[A-Za-z0-9_]{3,16}$/.test(u)){m.textContent="Enter your Minecraft username (3 to 16 letters, numbers or underscores).";$("mcname").focus();return}
  store("hendog_name",u);if(!CFG.STORE_URL){m.textContent="Payments are not connected yet. The store link has not been added.";return}
  m.className="msg ok";m.textContent="Opening the payment page. Use the username "+u+" there.";window.open(CFG.STORE_URL,"_blank","noopener")});
renderRanks();renderPacks();renderBasket();
