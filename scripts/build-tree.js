// scripts/build-tree.js
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter'); 
const { globSync } = require('glob'); 

const POSTS_DIR = path.join(process.cwd(), 'public/content/posts');

function getMarkdownFiles(dir) {
  return globSync(`${dir}/**/*.md`);
}

async function generateTree() {
  console.log('⏳ [JS-Script] Generating category tree...');

  const postPathList = getMarkdownFiles(POSTS_DIR);

  const allPosts = postPathList.map((postPath) => {
    // 🌟 1. 파일 시스템에서 수정일(mtime)을 먼저 확보합니다.
    const fileStat = fs.statSync(postPath);
    const fileMtime = fileStat.mtime.toISOString().split('T')[0]; // YYYY-MM-DD 포맷

    const fileContent = fs.readFileSync(postPath, 'utf-8');
    const { data, content } = matter(fileContent);

    const relativePostPath = path.relative(process.cwd(), postPath).replace(/\\/g, '/');
    const slug = path.basename(postPath, '.md');

    // 🌟 2. Frontmatter의 date를 최우선으로 치고, 없으면 파일 수정일(fileMtime)을 바인딩합니다.
    const postDate = data.date
      ? new Date(data.date).toISOString().split('T')[0]
      : fileMtime;

    // 🌟 3. 본문 텍스트 정제 및 압축 (Fuse.js 검색 용량 최적화용)
    const sanitizedContent = content
      .replace(/[#*`~\-_[\]()]/g, '') // 마크다운 기호 제거
      .replace(/\s+/g, ' ')           // 연속된 공백과 줄바꿈을 단일 공백으로 압축
      .trim()
      .slice(0, 1500);

    return {
      postPath: relativePostPath,
      slug,
      title: data.title || "제목 없음",
      domain: data.domain || "NoDomain",
      date: postDate,                 
      category: data.category || "Uncategorized",
      rawContent: sanitizedContent,   
    };
  });

  // 4. 트리 구조로 데이터 가공 (reduce)
  const tree = allPosts.reduce((acc, curr) => {
    const originalDomain = curr.domain;
    const domainSlug = curr.domain.toLowerCase(); 

    let domainNode = acc.find((d) => d.domain === originalDomain);
    if (!domainNode) {
      domainNode = {
        domain: originalDomain,     // 화면 표시용: "DevOps"
        domainSlug: domainSlug,     // URL 라우팅용: "devops"
        categories: []
      };
      acc.push(domainNode);
    }

    const originalCategory = curr.category;
    const categorySlug = curr.category.toLowerCase().replace(/\//g, '-');

    let categoryNode = domainNode.categories.find((c) => c.category === originalCategory);
    if (!categoryNode) {
      categoryNode = {
        category: originalCategory,
        categorySlug: categorySlug,
        posts: []
      };
      domainNode.categories.push(categoryNode);
    }

    // 🌟 5. 최종 카테고리 트리 파일 내부 객체에도 date를 유실 없이 집어넣어 줍니다.
    categoryNode.posts.push({
      title: curr.title,
      postPath: curr.postPath,
      slug: curr.slug,
      date: curr.date, // 👈 이 줄이 들어가야 PostPage와 블로그 메인 리스트에서 꺼내 쓸 수 있습니다.
      content: curr.rawContent
    });

    return acc;
  }, []);

  // 도메인 정렬 (오름차순)
  tree.sort((a, b) => a.domain.localeCompare(b.domain));

  // 5. JSON 파일 저장 경로 설정
  const outputPath = path.join(process.cwd(), 'src/shared/metadata/categoryTree.json');

  // 폴더가 없으면 자동 생성
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // JSON 쓰기
  fs.writeFileSync(outputPath, JSON.stringify(tree, null, 2));
  console.log('✅ [JS-Script] Category tree JSON generated successfully!');
}

generateTree().catch(err => {
  console.error('❌ Failed to generate tree:', err);
  process.exit(1);
});