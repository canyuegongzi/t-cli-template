const shell = require('shelljs');
import { fsCopy } from './lib/copy';
import { resolve } from 'path';
import { cwd } from 'process';

export const run = () => {
    shell.exec('ncc build ./src/main.ts -o ./war');
    fsCopy(resolve(cwd(), './src/config/application.dev.yaml'), resolve(cwd(), './war/application.dev.yaml'));
    fsCopy(resolve(cwd(), './src/config/application.pro.yaml'), resolve(cwd(), './war/application.pro.yaml'));
};
run();
