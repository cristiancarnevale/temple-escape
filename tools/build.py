import json,glob,re,sys
U=json.load(open('units.json'))
tr={}
for f in sorted(glob.glob('tr*.txt')):
    for ln in open(f).read().split('\n'):
        if not ln.strip(): continue
        a=ln.split('¦'); assert len(a)==3,(f,ln[:50])
        tr[int(a[0])]=(a[1],a[2])
def fit(key,t):
    lead=re.match(r'\s*',key).group(0); trail=re.search(r'\s*$',key).group(0)
    return lead+t.strip()+trail
keys=[];it=[];es=[]
for i,k in enumerate(U):
    if i not in tr: continue
    a,b=tr[i]
    keys.append(k);it.append(fit(k,a));es.append(fit(k,b))
extra={
 # words the game builds from code (directions, colours...) that are not whole sentences: 'north':('nord','norte'),
 'Language':('Lingua','Idioma'),
 'Riddle':('Indovinello','Acertijo'),
 'Ding!':('Din!','¡Din!'),
 'Slips<b>':('Scivoloni<b>','Resbalones<b>'),
}
for k,(a,b) in extra.items():
    if k in keys:
        j=keys.index(k); it[j]=a; es[j]=b   # override
    else: keys.append(k);it.append(a);es.append(b)
# dedupe keys (keep last)
seen={}
for i,k in enumerate(keys): seen[k]=i
order=sorted(seen.values())
keys=[keys[i] for i in order];it=[it[i] for i in order];es=[es[i] for i in order]
data=json.dumps({'k':keys,'it':it,'es':es},ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
open('data.json.txt','w').write(data)
print(len(keys),len(data))
