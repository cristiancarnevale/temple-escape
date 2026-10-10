(function(){
var LS='templeEscape.lang',LANGS=['en','it','es'],LANG='en';
try{var sv=window.localStorage.getItem(LS);if(LANGS.indexOf(sv)>=0)LANG=sv;else{var nl=String(navigator.language||'').slice(0,2).toLowerCase();if(nl==='it'||nl==='es')LANG=nl}}catch(e){
  try{var nl2=String(navigator.language||'').slice(0,2).toLowerCase();if(nl2==='it'||nl2==='es')LANG=nl2}catch(e2){}
}
var D=window.__I18N_DATA,IDX={},cache=new Map(),ALN=/[A-Za-z0-9À-ɏ]/;
function build(){
  IDX={};cache.clear();
  if(LANG==='en')return;
  var t=D[LANG],ks=D.k;
  for(var i=0;i<ks.length;i++){
    var k=ks[i],v=t[i];if(v==null||!k)continue;
    var c=k.charAt(0);
    (IDX[c]||(IDX[c]=[])).push([k,v,ALN.test(c),ALN.test(k.charAt(k.length-1))]);
  }
  for(var c2 in IDX)IDX[c2].sort(function(a,b){return b[0].length-a[0].length});
}
var TAG=/<\/?[A-Za-z][^>]*/y;
function tr(s){
  if(LANG==='en'||typeof s!=='string'||s.length<2)return s;
  var c=cache.get(s);if(c!==undefined)return c;
  var out='',i=0,n=s.length;
  while(i<n){
    var ch=s.charAt(i),L=IDX[ch],hit=null;
    if(L){
      var prevAl=i>0&&ALN.test(s.charAt(i-1));
      for(var j=0;j<L.length;j++){
        var e=L[j],k=e[0];
        if(s.startsWith(k,i)){
          if(e[2]&&prevAl)continue;
          var end=i+k.length;
          if(e[3]&&end<n&&ALN.test(s.charAt(end)))continue;
          hit=e;break;
        }
      }
    }
    if(hit){out+=hit[1];i+=hit[0].length;continue}
    if(ch==='<'){TAG.lastIndex=i;var m=TAG.exec(s);if(m){out+=m[0];i+=m[0].length;continue}}
    out+=ch;i++;
  }
  if(cache.size>12000)cache.clear();
  cache.set(s,out);
  return out;
}
/* patch the text sinks so every string the game writes is translated on the way out */
try{
  var di=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
  Object.defineProperty(Element.prototype,'innerHTML',{get:di.get,set:function(v){di.set.call(this,typeof v==='string'?tr(v):v)},configurable:true});
  var dt=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');
  Object.defineProperty(Node.prototype,'textContent',{get:dt.get,set:function(v){dt.set.call(this,typeof v==='string'?tr(v):v)},configurable:true});
  var cT=document.createTextNode;
  document.createTextNode=function(t){return cT.call(document,typeof t==='string'?tr(t):t)};
  var cp=CanvasRenderingContext2D.prototype,fT=cp.fillText;
  cp.fillText=function(t,x,y,w){return fT.call(this,typeof t==='string'?tr(t):t,x,y,w)};
}catch(e){}
/* static page text: remember originals so the language can change live */
var STATIC=[],ATTR=[];
function collect(){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;
  while((n=w.nextNode())){
    var p=n.parentNode&&n.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE')continue;
    if(/\S/.test(n.nodeValue))STATIC.push([n,n.nodeValue]);
  }
  var els=document.querySelectorAll('[aria-label]');
  for(var i=0;i<els.length;i++)ATTR.push([els[i],els[i].getAttribute('aria-label')]);
}
function apply(){
  for(var i=0;i<STATIC.length;i++)STATIC[i][0].nodeValue=tr(STATIC[i][1]);
  for(var j=0;j<ATTR.length;j++)ATTR[j][0].setAttribute('aria-label',tr(ATTR[j][1]));
  document.documentElement.lang=LANG;
  var lb=document.getElementById('langbtn');if(lb)lb.firstChild.nodeValue=LANG.toUpperCase();
}
collect();build();apply();
window.__i18n={
  get:function(){return LANG},
  tr:tr,
  set:function(l){
    if(LANGS.indexOf(l)<0)return;
    LANG=l;try{window.localStorage.setItem(LS,l)}catch(e){}
    build();apply();
  },
  next:function(){this.set(LANGS[(LANGS.indexOf(LANG)+1)%LANGS.length])}
};
})();
