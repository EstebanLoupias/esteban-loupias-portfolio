(function(){
  'use strict';
  try{
    var box=document.getElementById('carousel');if(!box)return;
    var slides=[].slice.call(box.querySelectorAll('.slide'));
    if(slides.length<2)return;
    var dotsBox=box.querySelector('.dots'),prev=box.querySelector('.prev'),next=box.querySelector('.next');
    var cur=0,timer=null,DELAY=4500,dots=[];

    slides.forEach(function(_,i){
      var d=document.createElement('button');d.className='dot-btn';d.type='button';
      d.setAttribute('aria-label','Ir a la imagen '+(i+1));
      d.addEventListener('click',function(){go(i);restart();});
      dotsBox.appendChild(d);dots.push(d);
    });

    function go(n){
      cur=(n+slides.length)%slides.length;
      slides.forEach(function(s,i){s.classList.toggle('active',i===cur);});
      dots.forEach(function(d,i){d.classList.toggle('active',i===cur);});
    }
    function start(){stop();timer=setInterval(function(){go(cur+1);},DELAY);}
    function stop(){if(timer){clearInterval(timer);timer=null;}}
    function restart(){start();}

    if(prev)prev.addEventListener('click',function(){go(cur-1);restart();});
    if(next)next.addEventListener('click',function(){go(cur+1);restart();});
    box.addEventListener('mouseenter',stop);box.addEventListener('mouseleave',start);
    box.addEventListener('focusin',stop);box.addEventListener('focusout',start);
    document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else start();});

    /* deslizar con el dedo en el celular */
    var x0=null;
    box.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;stop();},{passive:true});
    box.addEventListener('touchend',function(e){
      if(x0!==null){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1));}
      x0=null;start();
    });

    box.classList.add('on');go(0);start();
  }catch(e){console.warn('carrusel falló',e);}
})();
