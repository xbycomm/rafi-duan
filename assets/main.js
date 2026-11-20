(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();
  var h=document.getElementById('hdr');
  function s(){h.classList.toggle('scrolled',window.scrollY>20)} s(); window.addEventListener('scroll',s,{passive:true});
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
  var f=document.getElementById('leadForm');
  if(f) f.addEventListener('submit',function(e){
    e.preventDefault();
    var el=f.elements,n=el['name'].value.trim(),p=el['phone'].value.trim(),t=(f.querySelector('input[name=topic]:checked')||{}).value||'',err=document.getElementById('formErr');
    if(!n||p.replace(/\D/g,'').length<9){err.hidden=false;return} err.hidden=true;
    var msg='רפאל שלום, הגעתי מהאתר שלך.\nשם: '+n+'\nטלפון: '+p+'\nנושא: '+t+'\nאשמח שתחזור אליי.';
    window.open('https://api.whatsapp.com/send?phone=972506793693&text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
