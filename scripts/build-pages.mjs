/* 화면마다 진짜 HTML 파일을 미리 만들어 둡니다 (/about/index.html 같은 식).
   네이버 Yeti 는 자바스크립트를 거의 실행하지 못하므로, 미리 그려 두지 않으면
   크롤러 눈에는 메뉴와 하단 바밖에 보이지 않습니다.
   실행: npm run pages  (결과물은 저장소에 함께 커밋합니다 — Vercel 은 빌드를 돌리지 않습니다) */
import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://www.sketchmetal.co.kr';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

/* index.html 은 홈 화면의 결과물이기도 하므로, 껍데기로 쓸 때는
   미리 그려 넣은 본문과 JSON-LD 를 걷어 내고 씁니다 (몇 번을 돌려도 같은 결과가 나오도록) */
const shell = read('index.html')
  .replace(/<main id="app" tabindex="-1">[\s\S]*?<\/main>/, '<main id="app" tabindex="-1"></main>')
  .replace(/\n?<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
const imagesJs = read('assets/js/images.js');
const appJs = read('assets/js/app.js');

/* 화면별 <title> 과 설명문. 검색 결과에 그대로 나오는 글이라 사실만 짧게 적습니다 */
const DESC_DEFAULT =
  '부산 부산진구 개금동의 금속 전문건설 법인. 금속 구조물, 계단·난간, 캐노피·파사드, 맞춤제작, 안전시설 시공. 051-895-0888';
const PAGE_META = {
  '/': { desc: DESC_DEFAULT },
  '/about/': { desc: '(주)스케치금속건설 대표 인사말과 회사 정보, 사업자·건설업 등록증을 안내합니다.' },
  '/about/why/': { desc: '디자인이 다른 금속. 스케치금속건설이 일하는 방식과 앞으로의 약속을 소개합니다.' },
  '/about/location/': { desc: '부산광역시 부산진구 백양대로 312, 2층(개금동). 지도와 찾아오시는 길을 안내합니다.' },
  '/works/': { desc: '금속 구조물, 계단·난간, 창호·유리, 캐노피, 맞춤제작, 안전시설까지 실제 시공한 현장 사진입니다.' },
  '/contact/': { desc: '견적 문의를 남겨 주시면 확인 후 연락드립니다. 전화 051-895-0888, 이메일 sysoo222@hanmail.net' },
  '/privacy/': { desc: '(주)스케치금속건설 개인정보처리방침입니다.' },
};

/* 한 화면을 그려서 #app 안의 HTML 과 제목을 돌려줍니다 */
async function render(route) {
  const vc = new VirtualConsole(); // 브라우저 전용 기능이 없다는 경고는 무시합니다
  const dom = new JSDOM(shell, {
    url: ORIGIN + route,
    runScripts: 'outside-only',
    virtualConsole: vc,
  });
  const { window } = dom;

  /* jsdom 에 없는 브라우저 기능 최소한만 채웁니다 */
  const noop = () => {};
  window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.matchMedia = () => ({ matches: false, addEventListener: noop, removeEventListener: noop });
  window.scrollTo = noop;
  window.requestAnimationFrame = noop;
  window.cancelAnimationFrame = noop;
  window.Element.prototype.scrollIntoView = noop;
  window.Element.prototype.getBoundingClientRect = () => ({ top:0, left:0, right:0, bottom:0, width:0, height:0 });
  /* 브라우저에서는 <script> 두 개가 같은 전역을 공유하지만 eval 은 그렇지 않아서
     두 파일을 하나로 붙여 한 번에 실행합니다 */
  window.eval(imagesJs + '\n;\n' + appJs);

  const app = window.document.getElementById('app');
  const html = app.innerHTML;
  if (!html || html.length < 200) throw new Error(`${route} : 내용이 비어 있습니다 (${html.length}자)`);
  return { html, title: window.document.title };
}

/* 회사 정보를 검색엔진이 읽는 형식(JSON-LD)으로 적어 둡니다 */
const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: '(주)스케치금속건설',
  alternateName: '스케치금속건설',
  url: ORIGIN + '/',
  logo: ORIGIN + '/assets/img/brand/logo-sm.webp',
  image: ORIGIN + '/assets/img/brand/logo-sm.webp',
  telephone: '+82-51-895-0888',
  email: 'sysoo222@hanmail.net',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '백양대로 312, 2층(개금동)',
    addressLocality: '부산진구',
    addressRegion: '부산광역시',
    addressCountry: 'KR',
  },
  founder: { '@type': 'Person', name: '권대욱' },
  description: DESC_DEFAULT,
};

/* 통합검색 결과에 하위 링크가 붙도록 사이트 구조를 알려 줍니다 */
const NAV_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    ['회사소개', '/about/'],
    ['시공사례', '/works/'],
    ['견적문의', '/contact/'],
    ['WHY SKETCH METAL', '/about/why/'],
    ['오시는 길', '/about/location/'],
  ].map(([name, url], i) => ({ '@type': 'SiteNavigationElement', position: i + 1, name, url: ORIGIN + url })),
};

function buildHtml(route, { html, title }, desc) {
  const url = ORIGIN + route;
  let out = shell;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  out = out.replace(/(<meta name="description" content=")[^"]*(">)/, `$1${esc(desc)}$2`);
  out = out.replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${url}$2`);
  out = out.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`);
  out = out.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${esc(title)}$2`);
  out = out.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${esc(desc)}$2`);

  const ld = [ORG_LD, ...(route === '/' ? [NAV_LD] : [])]
    .map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n');
  out = out.replace('</head>', ld + '\n</head>');

  out = out.replace('<main id="app" tabindex="-1"></main>', `<main id="app" tabindex="-1">${html}</main>`);
  return out;
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---- 만들 주소 목록 ---- */
const tabSlugs = [...appJs.matchAll(/\{slug:'([a-z]+)'/g)].map(m => m[1]);
const caseIds = [...appJs.matchAll(/C\('(c[\w]+)'/g)].map(m => m[1]);

const routes = [
  '/', '/about/', '/about/why/', '/about/location/', '/works/',
  ...tabSlugs.map(s => `/works/${s}/`),
  ...[...new Set(caseIds)].map(id => `/case/${id}/`),
  '/contact/', '/privacy/',
];

let made = 0;
for (const route of routes) {
  const r = await render(route);
  const desc = (PAGE_META[route] || {}).desc || `${r.title.split(' | ')[0]} — (주)스케치금속건설 시공사례.`;
  const file = path.join(ROOT, route === '/' ? 'index.html' : route.slice(1) + 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buildHtml(route, r, desc), 'utf8');
  made++;
}

/* ---- 없는 주소로 들어왔을 때 보여 줄 화면 ---- */
const notFound = buildHtml('/404/', {
  title: '페이지를 찾을 수 없습니다 | 스케치금속건설',
  html: `<section class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
    <p class="text-s1 font-bold tracking-[0.2em] text-ink2">404</p>
    <h1 class="mt-4 text-s6 font-bold tracking-[-0.02em]">페이지를 찾을 수 없습니다</h1>
    <p class="mt-5 text-s2 text-ink2">주소가 바뀌었거나 없는 페이지입니다.</p>
    <div class="mt-10 flex flex-wrap justify-center gap-4">
      <a href="/" class="rounded-sm border border-ink px-7 py-2.5 text-s2 font-bold hover:bg-ink hover:text-paper">홈으로</a>
      <a href="/works/" class="rounded-sm border border-ink px-7 py-2.5 text-s2 font-bold hover:bg-ink hover:text-paper">시공사례 보기</a>
      <a href="/contact/" class="btn-metal rounded-sm px-7 py-2.5 text-s2 font-bold">견적 문의하기</a>
    </div>
  </section>`,
}, '요청하신 페이지를 찾을 수 없습니다.')
  .replace(/<link rel="canonical"[^>]*>\n?/, '')
  .replace('</head>', '<meta name="robots" content="noindex">\n</head>');
fs.writeFileSync(path.join(ROOT, '404.html'), notFound, 'utf8');

/* ---- sitemap.xml ---- */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- npm run pages 가 자동으로 다시 만듭니다. 직접 고치지 마세요 -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${ORIGIN}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r === '/' ? '1.0' : r.startsWith('/case/') ? '0.5' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

console.log(`페이지 ${made}개 + 404.html, sitemap.xml ${routes.length}개 주소를 만들었습니다.`);
