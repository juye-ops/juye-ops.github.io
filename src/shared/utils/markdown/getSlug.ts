import path from "path";

export function getSlugFromContentURL(contentUrl: string){
  return path.basename(contentUrl, '.md');
}