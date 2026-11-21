/* XBYcomm accessibility widget – self-hosted, no dependencies. v1 */
(function(){
  var d=document,root=d.documentElement,KEY='xby-a11y',STMT=(d.currentScript&&d.currentScript.getAttribute('data-statement'))||'accessibility.html';
  var css=[
  '.a11y-root{position:fixed;left:16px;bottom:16px;z-index:9999;font:15px/1.4 Arial,Helvetica,sans-serif;direction:rtl}',
  '@media (max-width:640px){.a11y-root{left:12px;bottom:calc(84px + env(safe-area-inset-bottom))}}',
  '.a11y-btn{width:52px;height:52px;border-radius:50%;border:3px solid #fff;background:#0b3d91;color:#fff;cursor:pointer;display:grid;place-items:center;box-shadow:0 6px 18px rgba(0,0,0,.28);padding:0}',
  '.a11y-btn svg{width:30px;height:30px;fill:currentColor}',
  '.a11y-btn:focus-visible,.a11y-panel button:focus-visible,.a11y-panel a:focus-visible{outline:3px solid #ffbf00;outline-offset:2px}',
  '.a11y-panel{position:absolute;left:0;bottom:62px;width:290px;max-width:calc(100vw - 24px);max-height:calc(100vh - 170px);overflow:auto;background:#fff;color:#111;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.3);border:1px solid #ccd;padding:14px}',
  '.a11y-panel[hidden]{display:none}',
  '.a11y-panel h2{font:700 17px/1.3 Arial,sans-serif;margin:0 0 10px;color:#0b3d91;display:flex;justify-content:space-between;align-items:center}',
  '.a11y-x{background:none;border:0;font-size:24px;line-height:1;cursor:pointer;color:#333;padding:2px 6px}',
  '.a11y-size{display:flex;align-items:center;gap:8px;margin-bottom:10px}',
  '.a11y-size span{flex:1;font-weight:700}',
  '.a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
  '.a11y-panel .a11y-opt{border:1.5px solid #b8c2d6;background:#f4f6fb;color:#111;border-radius:10px;padding:10px 6px;font:600 14px/1.25 Arial,sans-serif;cursor:pointer;text-align:center}',
  '.a11y-panel .a11y-opt[aria-pressed="true"]{background:#0b3d91;border-color:#0b3d91;color:#fff}',
  '.a11y-panel .a11y-sz{width:40px;height:40px;padding:0;font-size:18px}',
  '.a11y-foot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;gap:8px}',
  '.a11y-foot a{color:#0b3d91;font-weight:700;text-decoration:underline}',
  /* features (exclude the widget itself) */
  'html.a11y-gray body>*:not(.a11y-root){filter:grayscale(1)}',
  'html.a11y-contrast body,html.a11y-contrast body *:not(.a11y-root):not(.a11y-root *){background-color:#000!important;background-image:none!important;color:#fff!important;border-color:#fff!important;box-shadow:none!important;text-shadow:none!important}',
  'html.a11y-contrast body a:not(.a11y-root *),html.a11y-contrast body a:not(.a11y-root *) *{color:#ff0!important}',
  'html.a11y-contrast img{filter:none!important}',
  'html.a11y-links body a:not(.a11y-root *){text-decoration:underline!important;text-underline-offset:3px;outline:2px dashed #d40000!important;outline-offset:2px}',
  'html.a11y-font body *:not(.a11y-root *):not(svg):not(use){font-family:Arial,Helvetica,sans-serif!important;letter-spacing:.03em!important;word-spacing:.08em!important}',
  'html.a11y-font body p,html.a11y-font body li{line-height:1.8!important}',
  'html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}',
  'html.a11y-still .reveal{opacity:1!important;transform:none!important}'
  ].join('');
  var st=d.createElement('style');st.id='a11y-css';st.textContent=css;d.head.appendChild(st);

  var OPTS=[['contrast','ניגודיות גבוהה'],['gray','גווני אפור'],['links','הדגשת קישורים'],['font','גופן קריא'],['still','עצירת אנימציות']];
  var s={};try{s=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
  s.size=s.size||0;
  function apply(){
    OPTS.forEach(function(o){root.classList.toggle('a11y-'+o[0],!!s[o[0]])});
    d.body.style.zoom=s.size?String(1+s.size*0.1):'';
    try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}
    if(ui){[].forEach.call(ui.querySelectorAll('[data-k]'),function(b){b.setAttribute('aria-pressed',s[b.getAttribute('data-k')]?'true':'false')});
      ui.querySelector('.a11y-size span').textContent='גודל טקסט: '+(100+s.size*10)+'%';}
  }
  var ui=null;
  function build(){
    ui=d.createElement('div');ui.className='a11y-root';
    ui.innerHTML='<button type="button" class="a11y-btn" aria-expanded="false" aria-controls="a11y-panel" aria-label="תפריט נגישות"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg></button>'+
      '<div class="a11y-panel" id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-title" hidden>'+
      '<h2 id="a11y-title">התאמות נגישות<button type="button" class="a11y-x" aria-label="סגירת תפריט הנגישות">×</button></h2>'+
      '<div class="a11y-size" role="group" aria-label="גודל טקסט"><span aria-live="polite"></span><button type="button" class="a11y-opt a11y-sz" data-sz="-1" aria-label="הקטנת טקסט">א-</button><button type="button" class="a11y-opt a11y-sz" data-sz="1" aria-label="הגדלת טקסט">א+</button></div>'+
      '<div class="a11y-grid">'+OPTS.map(function(o){return '<button type="button" class="a11y-opt" data-k="'+o[0]+'" aria-pressed="false">'+o[1]+'</button>'}).join('')+
      '<button type="button" class="a11y-opt" data-reset>איפוס הגדרות</button></div>'+
      '<div class="a11y-foot"><a href="'+STMT+'">הצהרת נגישות</a></div></div>';
    d.body.appendChild(ui);
    var btn=ui.querySelector('.a11y-btn'),panel=ui.querySelector('.a11y-panel');
    function open(v){panel.hidden=!v;btn.setAttribute('aria-expanded',v?'true':'false');if(v)panel.querySelector('.a11y-x').focus();else btn.focus();}
    btn.addEventListener('click',function(){open(panel.hidden)});
    ui.querySelector('.a11y-x').addEventListener('click',function(){open(false)});
    ui.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){e.preventDefault();open(false)}});
    d.addEventListener('click',function(e){if(!panel.hidden&&!ui.contains(e.target)){panel.hidden=true;btn.setAttribute('aria-expanded','false')}});
    panel.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      if(b.hasAttribute('data-k')){var k=b.getAttribute('data-k');s[k]=!s[k];}
      else if(b.hasAttribute('data-sz')){s.size=Math.max(0,Math.min(5,s.size+(+b.getAttribute('data-sz'))));}
      else if(b.hasAttribute('data-reset')){s={size:0};}
      else return; apply();});
  }
  function init(){build();apply();}
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
