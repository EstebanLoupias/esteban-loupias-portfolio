(function(){
  'use strict';
  function safe(fn,name){try{fn();}catch(e){console.warn('init falló:',name,e);}}
  var B=window.__BRAND__||{};
  var root=document.documentElement;

  function initReveal(){
    var els=[].slice.call(document.querySelectorAll('.rv'));
    function show(el){el.classList.add('in');}
    if(!('IntersectionObserver' in window)){els.forEach(show);return;}
    root.classList.add('rv-on');
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target);}});
    },{threshold:0.05});
    els.forEach(function(el){io.observe(el);});
    setTimeout(function(){els.forEach(show);},6000); /* red de seguridad */
  }

  function initHeader(){
    var bar=document.getElementById('bar');if(!bar)return;
    function u(){bar.classList.toggle('solid',(window.pageYOffset||root.scrollTop)>20);}
    window.addEventListener('scroll',u,{passive:true});u();
  }

  function initNav(){
    var b=document.getElementById('burger'),n=document.getElementById('nav');if(!b||!n)return;
    function set(o){n.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false');}
    b.addEventListener('click',function(){set(!n.classList.contains('open'));});
    n.addEventListener('click',function(e){if(e.target.tagName==='A')set(false);});
  }

  function link(id,url){var a=document.getElementById(id);if(a&&url){a.href=url;a.hidden=false;}}
  function initContact(){
    if(B.email){var m=document.getElementById('mail');if(m){m.href='mailto:'+B.email;m.textContent=B.email;}}
    link('li',B.linkedin);link('ig',B.instagram);
    if(B.cardStation){link('cs-a',B.cardStation);var w=document.getElementById('cs-link');if(w)w.hidden=false;}
    var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  }

  safe(initReveal,'reveal');safe(initHeader,'header');safe(initNav,'nav');safe(initContact,'contact');
})();
