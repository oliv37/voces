import * as fs from 'node:fs';
import { EOL } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WORDS_CATEGORIES } from '@features/words/utils/words.util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let content = '';
for (let wordsCategory of WORDS_CATEGORIES) {
  content += `/${wordsCategory.pathParam}` + EOL;
  for (let wordsGroup of wordsCategory.wordsGroups) {
    content += `/${wordsCategory.pathParam}/${wordsGroup.pathParam}` + EOL;
    content +=
      `/${wordsCategory.pathParam}/${wordsGroup.pathParam}/exercice` + EOL;
  }
}

fs.writeFileSync(path.resolve(__dirname, '../../routes.txt'), content, 'utf8');
