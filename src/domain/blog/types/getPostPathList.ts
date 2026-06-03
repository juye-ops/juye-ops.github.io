import { glob } from "glob/raw";
import path from "path";

export async function getPostPathList() {
  const postDir = path.join(process.cwd(), 'public/content/posts');
  return await glob(`${postDir}/**/*.md`);
}