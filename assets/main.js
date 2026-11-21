(function(){
  var PHONE='972506793693';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();

  // WhatsApp links with a prefilled message per topic
  function wa(msg){return 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(msg)}
  [].forEach.call(document.querySelectorAll('a.wa[data-msg]'),function(a){a.href=wa(a.getAttribute('data-msg'))});

  // header shadow on scroll
  var h=document.getElementById('hdr');
  function s(){h.classList.toggle('scrolled',window.scrollY>40)} s(); window.addEventListener('scroll',s,{passive:true});

  // reveal on scroll
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  // FAQ: one open at a time
  var ds=[].slice.call(document.querySelectorAll('.faq-list details'));
  ds.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)ds.forEach(function(o){if(o!==d)o.open=false})})});

  // forms -> WhatsApp message
  function hook(id){
    var f=document.getElementById(id); if(!f) return;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var el=f.elements,n=el['name'].value.trim(),p=el['phone'].value.trim(),t=(f.querySelector('input[name=topic]:checked')||{}).value||'',err=f.querySelector('.ferr');
      if(!n||p.replace(/\D/g,'').length<9){err.hidden=false;return} err.hidden=true;
      var msg='רפאל שלום, הגעתי מהאתר שלך.\nשם: '+n+'\nטלפון: '+p+(t?'\nנושא: '+t:'')+'\nאשמח שתחזור אליי.';
      window.open(wa(msg),'_blank','noopener');
    });
  }
  hook('leadForm'); hook('quickForm');
})();
