(function(){
  var y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();
  var f=document.getElementById('leadForm'); if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var el=f.elements, n=el['name'].value.trim(), p=el['phone'].value.trim(), t=el['topic'].value, err=document.getElementById('formErr');
    if(!n||p.replace(/\D/g,'').length<9){err.hidden=false;return;} err.hidden=true;
    var msg='רפאל שלום, הגעתי מהאתר שלך.\nשם: '+n+'\nטלפון: '+p+'\nנושא: '+t+'\nאשמח שתחזור אליי.';
    window.open('https://api.whatsapp.com/send?phone=972506793693&text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
