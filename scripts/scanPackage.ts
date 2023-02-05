import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

const run = () => {
    const result: string = readFileSync(resolve(cwd(), './package.json')).toString();
    const packageJson: Record<string, string> = JSON.parse(result);
    const devDependencies = packageJson.devDependencies;
    const dependencies = packageJson.dependencies;
    console.log(Object.keys(devDependencies).join(' '))
    console.log('\n');
    console.log(Object.keys(dependencies).join(' '))
}

run();

const ss = '@nestjs/cli @types/jest @types/node @types/socket.io @types/supertest @types/ws @types/yaml @typescript-eslint/eslint-plugin @typescript-eslint/parser @vercel/ncc eslint eslint-config-prettier eslint-plugin-import jest nodemon prettier supertest ts-jest ts-node tsconfig-paths typescript'


const eeee = '@nest-middlewares/express-session @nestjs/common @nestjs/core @nestjs/jwt @nestjs/microservices @nestjs/passport @nestjs/platform-express @nestjs/platform-socket.io @nestjs/schematics @nestjs/swagger @nestjs/testing @nestjs/typeorm @nestjs/websockets @types/express babel-preset-env cache-manager cache-manager-redis-store class-transformer class-validator compression cross-env ejs exceljs express-session install js-base64 jsonwebtoken lodash moment multer mysql nestjs-redis nodemailer npm passport passport-http-bearer passport-jwt redis reflect-metadata rimraf rxjs socket.io-redis typeorm ws yaml'
