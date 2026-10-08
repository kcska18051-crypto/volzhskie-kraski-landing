import { cp, mkdir, readFile, stat } from 'node:fs/promises';
const html=await readFile('index.html','utf8');
if((html.match(/<h1[\s>]/g)||[]).length!==1) throw new Error('Expected one H1');
for(const [,asset] of html.matchAll(/(?:src|href)="((?:assets|src)\/[^"#]+)"/g)) await stat(asset);
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','direction.css','assets','src']) await cp(file,`dist/${file}`,{recursive:true});
console.log('Static build verified and saved to dist/');
