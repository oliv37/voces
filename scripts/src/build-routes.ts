import * as fs from 'node:fs';
import { EOL } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DATA } from '@utils/data.util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let content = '';
for (const category of DATA.flat()) {
  content += `/${category.pathParam}` + EOL;
  for (const group of category.groups) {
    content += `/${category.pathParam}/${group.pathParam}` + EOL;
    content += `/${category.pathParam}/${group.pathParam}/exercice` + EOL;
  }
}

fs.writeFileSync(path.resolve(__dirname, '../../routes.txt'), content, 'utf8');
