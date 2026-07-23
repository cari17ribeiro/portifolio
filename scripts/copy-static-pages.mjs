import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const files = await readdir(root);
const projectPages = files.filter((file) => /^projeto.*\.html$/i.test(file));

await Promise.all(
  projectPages.map((file) => copyFile(join(root, file), join(dist, file))),
);

await mkdir(join(dist, 'src'), { recursive: true });
await copyFile(join(root, 'src', 'style.css'), join(dist, 'src', 'style.css'));
