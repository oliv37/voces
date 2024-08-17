import fs from 'node:fs';
import { EOL } from 'node:os';

const NB_WORDS_GROUPS = 81;

let content = '';
for (let i = 1; i <= NB_WORDS_GROUPS; i++) {
  content += `/${i}` + EOL;
  content += `/${i}/exercice` + EOL;
}

fs.writeFileSync('./routes.txt', content, 'utf8');
