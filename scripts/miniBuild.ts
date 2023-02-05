const shell = require('shelljs');
import { fsCopy } from './lib/copy';
import { resolve } from 'path';
import { cwd } from 'process';

export const run = () => {
    shell.exec('ncc build ./src/main.ts -o ./war');
    fsCopy(resolve(cwd(), './src/config/env'), resolve(cwd(), './war/env'));
};
run();
