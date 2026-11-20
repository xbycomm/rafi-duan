(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();
  // header on scroll
  var tb=document.getElementById('topbar');
  function onScroll(){tb.classList.toggle('scrolled',window.scrollY>40)}
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  // reveal
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
  // counters
  [].forEach.call(document.querySelectorAll('.count'),function(c){
    if(reduce||!('IntersectionObserver' in window))return;
    var to=+c.dataset.to,done=false;
    var o=new IntersectionObserver(function(es){if(es[0].isIntersecting&&!done){done=true;var s=null;
      function step(t){if(!s)s=t;var p=Math.min((t-s)/1200,1);c.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)}
      requestAnimationFrame(step);o.disconnect()}});o.observe(c);
  });
  // slider
  var track=document.getElementById('track');
  if(track){
    var slides=track.children,dots=document.getElementById('dots'),idx=0,timer;
    for(var i=0;i<slides.length;i++){(function(i){var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-label','המלצה '+(i+1));b.onclick=function(){go(i);stop()};dots.appendChild(b)})(i)}
    function go(i){idx=(i+slides.length)%slides.length;track.scrollTo({left:slides[idx].offsetLeft-track.offsetLeft,behavior:reduce?'auto':'smooth'});mark()}
    function mark(){[].forEach.call(dots.children,function(d,j){d.setAttribute('aria-selected',j===idx?'true':'false')})}
    track.addEventListener('scroll',function(){var w=track.clientWidth;var i=Math.round(Math.abs(track.scrollLeft)/w);if(i!==idx&&i<slides.length){idx=i;mark()}},{passive:true});
    document.getElementById('next').onclick=function(){go(idx+1);stop()};
    document.getElementById('prev').onclick=function(){go(idx-1);stop()};
    function start(){if(!reduce)timer=setInterval(function(){go(idx+1)},6500)}
    function stop(){clearInterval(timer)}
    track.addEventListener('mouseenter',stop);track.addEventListener('focusin',stop);track.addEventListener('touchstart',stop,{passive:true});
    mark();start();
  }
  // form -> WhatsApp
  var f=document.getElementById('leadForm');
  if(f) f.addEventListener('submit',function(e){
    e.preventDefault();
    var el=f.elements,n=el['name'].value.trim(),p=el['phone'].value.trim(),t=el['topic'].value,err=document.getElementById('formErr');
    if(!n||p.replace(/\D/g,'').length<9){err.hidden=false;return} err.hidden=true;
    var msg='רפאל שלום, הגעתי מהאתר שלך.\nשם: '+n+'\nטלפון: '+p+'\nנושא: '+t+'\nאשמח שתחזור אליי.';
    window.open('https://api.whatsapp.com/send?phone=972506793693&text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
