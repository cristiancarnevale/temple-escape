# Usage: python3 inject.py   (run from the tools/ folder after build.py)
import os
h_path=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html')
data=open('data.json.txt').read()
h=open(h_path).read()
a=h.index('<script>window.__I18N_DATA=')
b=h.index(';</script>',a)
open(h_path,'w').write(h[:a]+'<script>window.__I18N_DATA='+data+h[b:])
print('translations injected')
