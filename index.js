import{a as f,S as p,i as n}from"./assets/vendor-DcHCnVjq.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const m="56077039-3a5cc0c41ca2a13984a31b614",y="https://pixabay.com/api/";async function g(o){const{data:r}=await f.get(y,{params:{key:m,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}});return r}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),h=new p(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){const r=o.map(({webformatURL:a,largeImageURL:s,tags:e,likes:t,views:i,comments:u,downloads:d})=>`
    <a href="${s}">
      <img src="${a}" alt="${e}" loading="lazy" />
      <div class="info">
        <p><b>Likes</b> ${t}</p>
        <p><b>Views</b> ${i}</p>
        <p><b>Comments</b> ${u}</p>
        <p><b>Downloads</b> ${d}</p>
      </div>
    </a>
  `).join("");c.insertAdjacentHTML("beforeend",r),h.refresh()}function L(){c.innerHTML=""}function v(){l.classList.add("visible")}function w(){l.classList.remove("visible")}const S=document.querySelector(".form");S.addEventListener("submit",async o=>{o.preventDefault();const r=o.target["search-text"].value.trim();if(r){L(),v();try{const a=await g(r);if(a.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(a.hits)}catch{n.error({message:"Something went wrong. Please try again!",position:"topRight"})}finally{w()}}});
//# sourceMappingURL=index.js.map
