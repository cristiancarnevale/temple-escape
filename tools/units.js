const fs=require('fs');
const lits=JSON.parse(fs.readFileSync('lits.json'));
// add capitalised single words + static html later
const acorn=require('acorn');
const html=fs.readFileSync(process.argv[2]||'../index.html','utf8');
const js=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].sort((a,b)=>b[1].length-a[1].length)[0][1];
const all=[];(function walk(n){if(!n||typeof n.type!=='string')return;if(n.type==='Literal'&&typeof n.value==='string')all.push(n.value);if(n.type==='TemplateElement')all.push(n.value.cooked);for(const k in n){const v=n[k];if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v.type==='string')walk(v)}})(acorn.parse(js,{ecmaVersion:2022}));
const singles=[...new Set(all)].filter(s=>/^[A-Z][a-z]{2,}$/.test(s));
// static HTML text nodes
const body=html.split('</style>')[1].split('<script>')[0];
const stat=[...body.matchAll(/>([^<>]*[A-Za-z]{2,}[^<>]*)</g)].map(m=>m[1].trim()).filter(Boolean);
const attrs=[...body.matchAll(/aria-label="([^"]+)"/g)].map(m=>m[1]);
const TAG=/(<(?!\/?(?:b|i|em|br)\b)[^>]*>)/;
const units=new Set();
for(const s of lits){for(const seg of s.split(TAG)){if(/^<(?!\/?(?:b|i|em|br)\b)/.test(seg))continue;
  const plain=seg.replace(/<[^>]*>/g,'');if(!/[A-Za-z]{2}/.test(plain))continue;if(/[{};]|\bvar\b|px;|rgba|#[0-9a-f]{6}|sans-serif|monospace/.test(seg)&&!/[a-z]{3} [a-z]{3}/.test(seg))continue;
  if(/^[\s.,;:!?'"()\-–—\d]*$/.test(plain))continue;
  units.add(seg)}}
for(const s of singles)units.add(s);for(const s of stat)units.add(s);for(const s of attrs)units.add(s);
const arr=[...units];
fs.writeFileSync('units.json',JSON.stringify(arr));
console.log(arr.length,arr.join('').length,singles.length,stat.length,attrs.length);
