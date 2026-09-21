/* 스케치금속건설 홈페이지 - 화면 구성과 동작. 회사 정보·사례 목록은 맨 위 SITE / TABS / CASES 를 고치세요 */
/* ============ 사이트 설정 (제작 시 여기만 바꾸면 됩니다) ============ */
const SITE = {
  name:'스케치금속건설', tel:'051-895-0888', telHref:'tel:0518950888',
  address:'부산광역시 부산진구 백양대로 312, 2층(개금동)',
  ceo:'권대욱', bizNo:'106-87-15952', conNo:'부산진2026-다-02',
  email:'sysoo222@hanmail.net',   // 회사 이메일 (문의 페이지·인사말·하단에 표시됩니다)
  mapAddress:'부산광역시 부산진구 백양대로 312',  // 지도 마커를 찍을 주소 (층·동 제외한 도로명 주소가 잘 찾아집니다)
  kakaoMapKey:'498bf4788049533ad844a7fb3762f95a',     // 카카오 개발자 사이트에서 발급한 JavaScript 키. 넣으면 실제 카카오맵과 마커가 표시됩니다
  lat:null, lng:null, // (선택) 마커 좌표를 직접 지정하려면 위도·경도를 넣으세요. 비워 두면 위 주소로 자동 검색합니다
  formEndpoint:'',    // 견적 문의를 받을 폼 서비스 주소. 비어 있으면 화면 흐름만 보여 줍니다
};
SITE.kakao = 'https://map.kakao.com/link/search/' + encodeURIComponent(SITE.address);
SITE.naver = 'https://map.naver.com/p/search/' + encodeURIComponent(SITE.address);

/* ============ 사진·로고 데이터 ============ */
const LOGO_CONTOUR = {"w": 563, "h": 754, "pts": [[287.0, 744.2], [276.0, 743.3], [250.0, 727.6], [234.0, 735.3], [223.0, 733.4], [211.6, 722.0], [209.0, 706.6], [108.0, 644.6], [105.1, 663.0], [97.0, 673.4], [86.0, 676.4], [73.6, 670.0], [69.6, 661.0], [69.4, 614.0], [42.0, 597.4], [34.5, 586.0], [35.6, 576.0], [46.0, 566.8], [54.0, 566.5], [69.4, 573.0], [69.4, 459.0], [16.0, 423.5], [9.8, 416.0], [8.6, 409.0], [15.5, 396.0], [26.0, 393.5], [36.0, 396.6], [72.0, 417.4], [72.7, 405.0], [76.8, 397.0], [84.0, 392.7], [91.0, 392.7], [101.2, 403.0], [103.0, 437.4], [248.0, 523.3], [340.3, 468.0], [88.0, 316.6], [71.0, 311.3], [41.0, 292.5], [35.8, 287.0], [33.6, 279.0], [36.7, 269.0], [44.0, 263.5], [54.0, 263.7], [69.4, 270.0], [69.4, 198.0], [55.0, 205.4], [44.0, 206.2], [33.7, 199.0], [31.5, 186.0], [39.0, 175.7], [68.4, 156.0], [76.5, 106.0], [80.5, 100.0], [90.0, 97.5], [97.3, 103.0], [105.0, 133.4], [264.0, 35.4], [262.5, 21.0], [268.0, 12.7], [281.0, 9.5], [295.0, 15.4], [312.0, 8.8], [320.0, 11.8], [325.4, 18.0], [325.0, 34.4], [480.0, 130.4], [483.4, 130.0], [485.8, 111.0], [492.0, 101.6], [502.0, 99.5], [509.4, 104.0], [514.5, 117.0], [517.6, 151.0], [547.5, 171.0], [553.5, 182.0], [552.3, 190.0], [545.0, 197.4], [533.0, 198.4], [516.5, 193.0], [515.6, 276.0], [540.0, 291.5], [542.3, 305.0], [537.0, 313.2], [528.0, 316.4], [510.0, 310.6], [509.4, 323.0], [505.4, 331.0], [494.0, 336.3], [486.0, 334.3], [479.7, 329.0], [476.6, 320.0], [476.0, 290.6], [295.0, 188.7], [239.6, 224.0], [495.0, 378.4], [505.0, 380.7], [518.0, 392.4], [545.5, 409.0], [549.4, 416.0], [549.5, 423.0], [544.0, 432.4], [531.0, 436.4], [516.0, 429.7], [514.6, 431.0], [513.7, 521.0], [515.0, 525.2], [528.0, 518.5], [540.0, 519.6], [547.3, 527.0], [548.5, 537.0], [543.0, 547.3], [513.6, 567.0], [513.5, 596.0], [510.3, 604.0], [505.0, 609.4], [490.0, 611.2], [479.6, 603.0], [476.0, 591.6], [468.0, 595.6], [294.0, 706.6], [292.6, 709.0], [301.3, 719.0], [302.5, 728.0], [298.5, 736.0], [287.0, 744.2]]};

/* ============ 시공사례 데이터 (8개 탭) ============ */
const TABS = [
  {slug:'all', name:'전체', line:'작업한 현장 사진을 모두 모았습니다.'},
  {slug:'clients', name:'주요 시공처', line:'시공처별로 모아 봤습니다.'},
  {slug:'structures', name:'금속 구조물·조형물', line:'포토존 조형물, 공원 시설물, 공항 구조틀까지 제작합니다.', home:'c44_1'},
  {slug:'stairs', name:'계단·난간·데크', line:'철계단, 스테인리스 난간, 데크를 만들고 설치합니다.', home:'c8_0'},
  {slug:'windows', name:'창호·유리', line:'금속 창호와 방화창, 유리 시공을 합니다.', home:'c36_0'},
  {slug:'canopy', name:'캐노피·파사드', line:'건물 입구 캐노피와 상가 외벽 금속 마감을 합니다.', home:'c22_0'},
  {slug:'custom', name:'맞춤제작·인테리어', line:'의자, 선반, 대문, 매장 인테리어를 주문받아 만듭니다.', home:'c24_0'},
  {slug:'safety', name:'안전시설·보수', line:'안전문, 사다리, 펜스부터 보수공사까지 맡습니다.', home:'c29_0'},
];
const C = (id,tab,title)=>({id,tab,title,imgs:META[id],ar:AR[id]});
const CASES = [
  C('c44','structures','기장 죽성성당 포토존 조형물'),
  C('c39','structures','기장 안데르센공원 조형물·금속 구조물'),
  C('c34','structures','김해공항 금속 구조틀 설치'),
  C('c25','structures','국립과학관 금속 구조물 설치'),
  C('c35','structures','지하철역 내부 금속 구조물'),
  C('c32','structures','센텀 내부 금속 구조틀 설치'),
  C('c28_38','structures','대학교 강단·경원고 단상 금속 구조틀'),
  C('c1','stairs','벡스코 금속 철계단'),
  C('c8','stairs','영도 신기산업 카페 철재 계단'),
  C('c27','stairs','양산 철재 계단'),
  C('c50','stairs','벡스코 옥상 철계단'),
  C('c26','stairs','양산 건물옥상 철재 계단'),
  C('c53','stairs','엄궁 병원 스텐 계단난간'),
  C('c3','stairs','광안리 제주와 홍돼지 데크'),
  C('c36','windows','벡스코 방화창 설치'),
  C('c7','windows','농장 하이샤시 창호·목마감'),
  C('c20','windows','공장 썬라이트'),
  C('c22','canopy','부산 송수초등학교 캐노피 설치'),
  C('c40','canopy','외부 금속 파사드'),
  C('c10_14_30_33','canopy','상가 외부 금속 파사드 모음'),
  C('c24','custom','디자인 의자 제작'),
  C('c31','custom','주문 제작 선반'),
  C('c9','custom','전포동 라멘집 다찌·금속 인테리어'),
  C('c6','custom','광안리 발색스텐 디자인 구조물'),
  C('c5_4','custom','서울 코다리식당 금속 인테리어·난간'),
  C('c2','custom','광안리 제주와 홍돼지 증축·인테리어'),
  C('c12_13','custom','남포동 매장 금속 인테리어·천정 구조물'),
  C('c23','custom','대문 제작 설치'),
  C('c52','safety','벡스코 옥상 안전사다리'),
  C('c29','safety','부산 사상고등학교 안전사다리'),
  C('c15','safety','부산 영화의전당 조립형 안전펜스'),
  C('c46','safety','벡스코 빗물 유도배수판'),
  C('c45_42','safety','벡스코 접이식 안전문·안전덮개'),
  C('c49','safety','부산 누리마루 난간 보수'),
  C('c47_51','safety','벡스코 코킹 (전시장 상부·창호유리)'),
  C('c17','safety','옥상 철재 안전난간'),
];
const BY = Object.fromEntries(CASES.map(c=>[c.id,c]));
const TABNAME = Object.fromEntries(TABS.map(t=>[t.slug,t.name]));
const CLIENTS = [
  {name:'벡스코', ids:['c1','c50','c52','c46','c45_42','c36','c47_51']},
  {name:'공항·지하철', ids:['c34','c35']},
  {name:'문화·공공시설', ids:['c44','c39','c25','c15','c49']},
  {name:'학교·대학', ids:['c22','c29','c28_38']},
];
const FEATURED = ['c44','c39','c24','c31','c22','c1','c29','c34','c40'];
const TOP3 = [
  {name:'벡스코', img:'c1_0', id:'c1'},
  {name:'국립과학관', img:'c25_0', id:'c25'},
  {name:'송수초등학교', img:'c22_0', id:'c22'},
];
const AREAS = [...TABS.filter(t=>t.home).map(t=>[t.slug,t.name]), ['mixed','복합 시공 (2개 이상)'], ['etc','기타 / 일반 상담']];

/* ============ 유틸 ============ */
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const app = $('#app');
const WRAP = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
const H2 = 'text-s6 font-bold leading-[1.15] tracking-[-0.02em] md:text-s7';
const BTN = 'btn-metal inline-flex items-center justify-center gap-2 rounded-sm px-7 py-2.5 text-s2 font-bold active:translate-y-px';
const BTN_LINE = 'inline-flex items-center justify-center rounded-sm border-2 border-ink px-8 py-3.5 text-s2 font-bold transition-colors duration-200 hover:bg-ink hover:text-paper active:translate-y-px';
const LINK = 'font-bold underline decoration-ink decoration-[1.5px] underline-offset-[6px] transition-colors hover:text-navy hover:decoration-gold-deep';
const esc = s => String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

const dot = (n,cls='h-9 w-9 text-s2') => `<span class="inline-flex ${cls} shrink-0 items-center justify-center rounded-full border-2 border-gold font-bold leading-none text-navy" aria-hidden="true">${n}</span>`;
const groupOf = id => (CLIENTS.find(g=>g.ids.includes(id))||{}).name;
function tabCount(slug){
  if(slug==='all') return CASES.length;
  if(slug==='clients') return new Set(CLIENTS.flatMap(g=>g.ids)).size;
  return CASES.filter(c=>c.tab===slug).length;
}
function casesOf(slug){
  if(slug==='all') return [...FEATURED.map(i=>BY[i]), ...CASES.filter(c=>!FEATURED.includes(c.id))];
  if(slug==='clients') return CLIENTS.flatMap(g=>g.ids.map(i=>BY[i]));
  return CASES.filter(c=>c.tab===slug);
}
const WORKS_GRID = 'grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-12';
function caseCard(c,from){
  const n = c.imgs.length, pos = c.ar<1 ? '50% 32%' : '50% 50%';
  return `<div class="tab-fade"><a class="case group block w-full text-left" href="#/case/${c.id}?from=${from}" aria-label="${c.title} 자세히 보기">
    <span class="block aspect-[4/3] overflow-hidden rounded-sm bg-plate"><img src="${IMG[c.imgs[0]]}" alt="${c.title}" style="object-position:${pos}" class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" decoding="async" loading="lazy"></span>
    <span class="mt-3 block text-s2 font-bold leading-snug group-hover:underline group-hover:decoration-gold-deep group-hover:decoration-[1.5px] group-hover:underline-offset-4">${c.title}</span>
    <span class="mt-1 flex justify-between gap-3 text-s0 text-ink2"><span>${TABNAME[c.tab]}</span>${n>1?`<span class="shrink-0">사진 ${n}장</span>`:''}</span>
  </a></div>`;
}

/* ============ 공통 조각 ============ */
const gbar = '<span class="h-1.5 w-10 shrink-0 bg-gold" aria-hidden="true"></span>';
const sectionTitle = (id,text,cls='') => `<div class="flex items-center gap-4 ${cls}" data-reveal>${gbar}<h2 id="${id}" class="text-s6 font-bold leading-[1.2] tracking-[-0.015em] md:text-s7">${text}</h2></div>`;
const RINGS = `<svg class="pointer-events-none absolute -right-52 -top-52 h-[700px] w-[700px] text-white/[0.07]" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="0.5" aria-hidden="true">${[16,32,48,64,80,96].map(r=>`<circle cx="100" cy="100" r="${r}"/>`).join('')}</svg>`;
const WHY_ITEMS = [
  ['美','01.','디자인이 다른 금속','대표가 미술대학에서 공부했습니다. 같은 난간이어도 벽 색깔, 계단 폭, 손이 닿는 높이가 건물마다 다르니 현장에 먼저 가서 봅니다. 모양은 그다음에 정합니다.'],
  ['精','02.','기술력이 다른 금속','금속 현장에서 10년 넘게 일했습니다. 벡스코 철계단과 안전사다리, 김해공항 구조틀, 영화의전당 안전펜스처럼 크기도 쓰임도 다른 공사를 해 왔습니다. 치수는 현장에서 다시 재고, 설치할 때는 안전부터 확인합니다.'],
  ['信','03.','등록된 건설업 법인','금속·창호·지붕·건축물조립공사업으로 건설업 등록을 마쳤습니다. 법인은 2026년에 새로 세웠고, 그전에도 전문건설업체를 운영하며 여러 현장을 맡았습니다.'],
];
/* WHY SKETCH METAL: 네이비 면 + 금색 한자 (홈과 회사소개 > WHY 탭에서 같이 씁니다) */
function whyBlock(){
  return `<section class="relative overflow-hidden bg-navy py-20 text-white md:py-28" aria-labelledby="wT">${RINGS}
    <div class="${WRAP} relative">
      <div class="mx-auto max-w-3xl text-center" data-reveal>
        <p class="hanja select-none text-[7rem] text-white/[0.07] md:text-[9rem]" aria-hidden="true">匠</p>
        <p class="eyebrow -mt-6 justify-center text-gold md:-mt-9">Why Sketch Metal</p>
        <h2 id="wT" class="mt-6 text-s6 font-semibold leading-[1.3] tracking-[-0.015em] md:text-s7">만들기 전에 <span class="text-gold-soft">현장</span>부터 봅니다.</h2>
        <p class="mx-auto mt-6 max-w-xl text-s2 text-white/75">도면에 나오지 않는 것, 이를테면 벽 재질이나 사람이 지나다니는 길까지 먼저 확인합니다.</p>
      </div>
      <div class="mx-auto mt-14 max-w-5xl md:mt-16">${WHY_ITEMS.map((r,i)=>`<div data-reveal style="--i:${i}" class="grid grid-cols-[4.5rem_1fr] items-start gap-x-6 border-t border-white/15 py-9 last:border-b md:grid-cols-[9.5rem_1fr] md:gap-x-10 md:py-11"><div class="text-center"><span class="hanja block text-[3.4rem] text-gold md:text-[4.6rem]" aria-hidden="true">${r[0]}</span><span class="mt-3 block text-s0 font-medium tracking-[0.2em] text-white/60">${r[1]}</span></div><div><h3 class="text-s4 font-semibold leading-snug tracking-[-0.015em] md:text-s5">${r[2]}</h3><p class="mt-4 max-w-[38em] text-s2 leading-[1.9] text-white/75">${r[3]}</p></div></div>`).join('')}</div>
    </div></section>`;
}

/* ============ 홈 ============ */
function pageHome(){
  const plates = TABS.filter(t=>t.home);
  const tile = (href,img,alt,name,i,cls) => `<a href="${href}" data-reveal style="--i:${i}" class="tile group block ${cls||''}"><span class="tile-in block"><span class="tile-media relative block aspect-[4/3] overflow-hidden bg-plate"><img src="${img}" alt="${alt}" class="tile-img h-full w-full object-cover" decoding="async"></span><b class="mt-3 block border-t-2 border-ink pt-3 font-serif text-s3 font-semibold tracking-[-0.01em] md:text-s4">${name}</b></span></a>`;
  const plateHtml = plates.map((t,i)=>tile(`#/works/${t.slug}`,IMG[t.home],t.name,t.name,i%3)).join('');
  const topHtml = TOP3.map((t,i)=>tile(`#/case/${t.id}?from=clients`,IMG[t.img],t.name,t.name,i)).join('');
  return `
  <section id="hero" class="relative overflow-hidden bg-mist" aria-labelledby="hT">
    <div class="${WRAP} grid items-center gap-x-10 md:grid-cols-12 md:min-h-[calc(100dvh-4rem)]">
      <div class="hv -mx-4 px-4 pb-11 pt-8 sm:-mx-6 sm:px-6 md:col-span-5 md:mx-0 md:px-0 md:py-14">
        <span class="hs hs-gold" aria-hidden="true"></span><span class="hs hs-coal" aria-hidden="true"></span><span class="hs hs-navy" aria-hidden="true"></span>
        <div id="logoStage" class="relative z-10 mx-auto aspect-[3/4] w-full max-w-[290px] md:max-w-[420px]">
          <div class="pointer-events-none absolute bottom-[3%] left-[12%] right-[12%] h-[6%] rounded-[50%]" style="background:radial-gradient(closest-side,rgba(0,0,0,.4),rgba(0,0,0,0))"></div>
          <img id="logoFallback" src="${IMG.logo}" alt="스케치금속건설 S 로고" class="absolute inset-0 h-full w-full object-contain" decoding="async">
          <canvas id="logoCanvas" class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
        </div>
      </div>
      <div class="relative z-10 pb-12 pt-10 md:col-span-7 md:py-14 md:pl-8">
        <div class="wmw w-full max-w-[680px]">
          <div class="wm">
            <span class="wm-ju" aria-hidden="true">(주)</span>
            <h1 id="hT" class="min-w-0"><img src="${IMG.wordmark}" alt="(주)스케치금속건설" class="block w-full" width="1700" height="221"></h1>
            <p class="wm-sub"><span class="h-px flex-1 bg-ink2"></span>금속구조물 · 창호공사<span class="h-px flex-1 bg-ink2"></span></p>
          </div>
        </div>
        <p class="hand mt-9 [font-size:clamp(2.8rem,6.4vw,4.8rem)] leading-[1.16]">
          <span class="relative inline-block">미대출신의 감각,<svg class="absolute -bottom-1 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path class="stroke s1" style="--len:230" d="M2 8 C40 3 90 9 150 5 S190 6 198 4" fill="none" stroke="#079BDA" stroke-width="3.2" stroke-linecap="round"/></svg></span><br>
          <span class="relative inline-block">금속기술의 완성<svg class="absolute -bottom-1 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path class="stroke s2" style="--len:230" d="M2 6 C50 10 100 3 160 7 S190 5 198 7" fill="none" stroke="#EF9A22" stroke-width="3.2" stroke-linecap="round"/></svg></span>
        </p>
        <div class="mt-10"><a href="#/contact" class="${BTN}">견적 문의하기</a></div>
      </div>
    </div>
  </section>

  <section class="bg-white" aria-labelledby="cT">
    <div class="${WRAP} py-16 md:py-24">
      ${sectionTitle('cT','주요 시공처','mb-10 md:mb-14')}
      <div class="grid gap-x-6 gap-y-10 sm:grid-cols-3">${topHtml}</div>
    </div>
  </section>

  <section class="relative overflow-hidden bg-plate pb-16 pt-14 md:pb-28 md:pt-20" aria-labelledby="fT">
    <span class="pointer-events-none absolute right-0 top-0 h-[7.5rem] w-[7.5rem] bg-gold md:h-[12rem] md:w-[12rem]" style="clip-path:polygon(100% 0,100% 100%,0 0)" aria-hidden="true"></span>
    <span class="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-navy md:h-40 md:w-40" style="clip-path:polygon(100% 0,100% 100%,0 0)" aria-hidden="true"></span>
    <div class="${WRAP} relative">
      ${sectionTitle('fT','시공분야','mb-10 md:mb-14')}
      <div class="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-14">${plateHtml}</div>
    </div>
  </section>

  ${whyBlock()}

  <section class="relative overflow-hidden bg-gold py-20 text-ink md:py-28" aria-labelledby="pT">
    <span class="pointer-events-none absolute left-0 top-0 h-[7vw] w-full bg-navy" style="clip-path:polygon(0 0,100% 0,0 100%)" aria-hidden="true"></span>
    <div class="${WRAP} relative grid items-end gap-12 pt-6 lg:grid-cols-12">
      <div class="lg:col-span-7" data-reveal>
        <h2 id="pT" class="text-s3 font-bold tracking-[0.02em]">스케치금속건설 다짐</h2>
        <p class="mt-5 font-serif text-s6 font-semibold leading-[1.22] tracking-[-0.015em] md:text-s7 xl:text-s8">작은 공사도<br>소홀히 하지 않겠습니다.</p>
        <p class="mt-6 text-s3">디자인부터 제작, 시공까지 한 곳에서 맡습니다.</p>
      </div>
      <div class="lg:col-span-5" data-reveal style="--i:1">
        <p class="text-s3 font-bold leading-[1.75] md:text-s4"><a href="${SITE.telHref}" class="hover:underline">Tel)051-895-0888</a><br><a href="mailto:${SITE.email}" class="break-all hover:underline">E-mail)${SITE.email}</a></p>
        <a href="#/contact" class="btn-metal on-gold mt-8 inline-flex items-center justify-center rounded-sm px-7 py-2.5 text-s2 font-bold">견적 문의하기</a>
      </div>
    </div>
  </section>`;
}

/* ============ 회사소개 공통 ============ */
function pageHead(title,sub){
  return `<div class="border-b border-rule"><div class="${WRAP} pb-8 pt-14 md:pt-20"><h1 class="text-s7 font-bold leading-[1.1] tracking-[-0.02em] md:text-s8">${title}</h1>${sub?`<p class="mt-4 max-w-[40ch] text-s3 text-ink2">${sub}</p>`:''}</div></div>`;
}
function aboutTabs(cur){
  const items=[['greet','인사말','#/about'],['why','WHY SKETCH METAL','#/about/why'],['loc','오시는 길','#/about/location']];
  return `<div class="border-b border-rule bg-white"><nav class="${WRAP} flex gap-1 overflow-x-auto" aria-label="회사소개 메뉴">${items.map(([k,n,h])=>`<a href="${h}" ${k===cur?'aria-current="page"':''} class="shrink-0 border-b-[3px] border-transparent px-4 py-3.5 text-s1 font-bold text-ink2 transition-colors hover:text-ink aria-[current=page]:border-gold aria-[current=page]:text-navy">${n}</a>`).join('')}</nav></div>`;
}
/* 제목 띠: 네이비 바탕에 철골 사진과 도면 격자, 아래는 금색 선 */
function banner(title,sub,img){
  return `<div class="relative overflow-hidden border-b-4 border-gold bg-navy">
    <img src="${IMG[img]}" alt="" aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover opacity-45 md:w-[62%]" style="-webkit-mask-image:linear-gradient(to left,#000 35%,transparent);mask-image:linear-gradient(to left,#000 35%,transparent)" decoding="async">
    <span class="pointer-events-none absolute inset-0" style="background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px" aria-hidden="true"></span>
    <div class="${WRAP} relative py-12 md:py-16"><div class="flex items-center gap-4">${gbar}<h1 class="text-s6 font-bold tracking-[-0.015em] text-white md:text-s7">${title}</h1></div>${sub?`<p class="mt-4 max-w-[40ch] text-s2 text-white/75">${sub}</p>`:''}</div>
  </div>`;
}
function aboutTop(cur){ return aboutTabs(cur) + banner('회사소개','','c34_0'); }
const CARD = 'border border-rule bg-white';

function pageGreeting(){
  const info = [['상호','(주)스케치금속건설'],['대표자',SITE.ceo],['사업자등록번호',SITE.bizNo],['건설업등록번호',SITE.conNo],['업종','금속·창호·지붕·건축물조립공사업'],['소재지',SITE.address],['Tel',`<a href="${SITE.telHref}" class="font-bold underline decoration-ink decoration-[1.5px] underline-offset-4">${SITE.tel}</a>`],['이메일',`<a href="mailto:${SITE.email}" class="font-bold underline decoration-ink decoration-[1.5px] underline-offset-4 break-all">${SITE.email}</a>`]];
  const rows = info.map(([k,v])=>`<div class="grid grid-cols-[7.6rem_1fr] border-b border-rule text-s1 leading-relaxed last:border-b-0 md:grid-cols-[8.4rem_1fr]"><dt class="bg-plate px-4 py-3.5 text-ink2">${k}</dt><dd class="px-4 py-3.5">${v}</dd></div>`).join('');
  return aboutTop('greet') + `<div class="bg-mist">
  <section class="${WRAP} pb-6 pt-10 md:pt-12">
    <div class="grid gap-6 lg:grid-cols-12 lg:items-stretch">
      <div class="${CARD} p-6 md:p-8 lg:col-span-5">
        <h2 class="flex items-baseline gap-3 text-s4 font-bold tracking-[-0.02em]">회사 정보<span class="font-sans text-s1 font-medium text-ink2">Information</span></h2>
        <dl class="mt-6 border-y border-rule">${rows}</dl>
      </div>
      <div class="${CARD} p-6 md:p-8 lg:col-span-7">
        <div class="flex items-start justify-between gap-4"><div><h2 class="text-s4 font-bold tracking-[-0.02em]">대표 인사말</h2><span class="mt-2 block h-[3px] w-9 bg-gold" aria-hidden="true"></span></div><span class="hidden pt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink2 sm:block">Sketch Metal</span></div>
        <div class="mt-7 grid gap-7 sm:grid-cols-[minmax(0,15rem)_1fr]">
          <div>
            <button class="block w-full text-left" data-zoom="rep" data-title="대표 ${SITE.ceo}" aria-label="대표 사진 크게 보기"><span class="block aspect-[4/5] overflow-hidden rounded-sm bg-plate"><img src="${IMG.rep}" alt="스케치금속건설 대표 ${SITE.ceo}" class="h-full w-full object-cover object-[50%_22%]" decoding="async"></span></button>
            <div class="mt-4 flex items-center justify-between gap-3"><span class="text-s1 text-ink2">대표이사 <b class="ml-1 text-s3 font-bold text-ink">${SITE.ceo}</b></span><span class="hand -rotate-6 text-[2.3rem] leading-none text-ink/85" aria-hidden="true">${SITE.ceo}</span></div>
          </div>
          <div class="space-y-4 text-s1 leading-[1.85] md:text-s2 md:leading-[1.85]">
            <p class="text-s3 font-bold leading-[1.5] tracking-[-0.02em]">안녕하십니까.<br><span class="text-navy">(주)스케치금속건설 대표 ${SITE.ceo}입니다.</span></p>
            <p>저는 동아대학교 미술대학에서 공부한 뒤 10년 넘게 금속 현장을 다니며 기술을 익혔습니다. 금속 일은 만들어서 붙이면 끝나는 게 아닙니다. 공간에 놓였을 때 모양이 어울리는지, 쓰기 편한지, 튼튼한지까지 봐야 끝난다고 생각합니다.</p>
            <p>스케치금속건설은 이 생각으로 시작했습니다. 건물과 공간을 먼저 보고 기능과 디자인을 같이 챙기는 '디자인이 다른 금속'을 만들려고 합니다.</p>
            <p>법인으로는 이제 시작했지만 그전에도 전문건설업체를 운영하며 여러 현장을 맡아 왔습니다. 그때 쌓은 경험이 지금 일의 바탕입니다.</p>
            <p>맡겨 주시면 결과로 보여드리겠습니다. 감사합니다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="${WRAP} pb-20 pt-6 md:pb-28" id="certs" aria-labelledby="certT">
    <div class="grid gap-8 border-t border-rule pt-12 lg:grid-cols-12">
      <div class="lg:col-span-3"><h2 id="certT" class="text-s5 font-bold tracking-[-0.02em]">등록증</h2><span class="mt-3 block h-[3px] w-14 bg-gold" aria-hidden="true"></span></div>
      <div class="grid max-w-[700px] grid-cols-2 gap-5 md:gap-6 lg:col-span-9">
        <button class="group ${CARD} block p-4 text-center transition-colors hover:border-ink" data-zoom="biz" data-title="사업자등록증"><span class="block aspect-[4/5] overflow-hidden bg-plate"><img src="${IMG.biz}" alt="사업자등록증" class="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" decoding="async"></span><span class="mt-4 block text-s1 font-bold">사업자등록증</span></button>
        <button class="group ${CARD} block p-4 text-center transition-colors hover:border-ink" data-zoom="con" data-title="건설업등록증"><span class="block aspect-[4/5] overflow-hidden bg-plate"><img src="${IMG.con}" alt="건설업등록증" class="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" decoding="async"></span><span class="mt-4 block text-s1 font-bold">건설업등록증</span></button>
      </div>
    </div>
  </section></div>`;
}

/* 비전: 한 문장 머리말 + 세 가지 방향 */
function visionBlock(){
  const items=[
    ['01.','디자인부터 시공까지 한 곳에서','스케치와 제작, 설치가 따로 놀지 않도록 처음부터 끝까지 이어서 맡습니다.'],
    ['02.','사례로 먼저 보여드립니다','맡은 현장은 사진과 함께 계속 올려 두겠습니다. 말보다 결과를 먼저 보고 판단하셨으면 합니다.'],
    ['03.','작은 공사도 같은 기준으로','난간 하나, 문 하나도 큰 현장과 같은 방식으로 치수를 재고 안전을 확인합니다.'],
  ];
  return `<section class="relative overflow-hidden bg-mist py-20 md:py-28" aria-labelledby="vT">
    <div class="${WRAP} relative">
      <div class="mx-auto max-w-3xl text-center" data-reveal>
        <p class="hanja select-none text-[7rem] text-ink/[0.06] md:text-[9rem]" aria-hidden="true">築</p>
        <p class="eyebrow -mt-6 justify-center text-gold-deep md:-mt-9">Vision</p>
        <h2 id="vT" class="mt-6 text-s6 font-semibold leading-[1.3] tracking-[-0.015em] md:text-s7">남의 현장에서 배운 10년,<br>이제 <span class="text-gold-deep">우리 이름</span>으로 짓습니다.</h2>
        <p class="mx-auto mt-6 max-w-xl text-s2 text-ink2">법인은 새로 시작했지만 일하는 방식은 그대로입니다. 현장을 먼저 보고, 모양과 쓰임을 같이 정하고, 설치까지 직접 챙깁니다.</p>
      </div>
      <div class="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-10 md:mt-16 md:grid-cols-3">${items.map((r,i)=>`<div data-reveal style="--i:${i}" class="border-t-[3px] border-gold pt-6"><span class="text-s0 font-semibold tracking-[0.2em] text-gold-deep">${r[0]}</span><h3 class="mt-3 text-s4 font-semibold leading-snug tracking-[-0.015em]">${r[1]}</h3><p class="mt-3 text-s2 leading-[1.85] text-ink2">${r[2]}</p></div>`).join('')}</div>
    </div></section>`;
}
function pageWhy(){
  return aboutTop('why') + whyBlock() + visionBlock() + `
  <section class="bg-steel py-16 text-white md:py-20"><div class="${WRAP} flex flex-wrap items-center justify-between gap-8">
    <h2 class="max-w-[24ch] text-s5 font-semibold leading-[1.35] md:text-s6">우리 현장도 할 수 있는지 궁금하시면</h2>
    <a href="#/contact" class="btn-metal light inline-flex items-center justify-center rounded-sm px-7 py-2.5 text-s2 font-bold">견적 문의하기</a>
  </div></section>`;
}

const SIGN = '<svg class="h-16 w-16 shrink-0" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M30 8h4v48h-4z" fill="#0A2A4A"/><path d="M12 12h30l6 6-6 6H12z" fill="#0A2A4A"/><path d="M52 28H22l-6 6 6 6h30z" fill="#F0B429"/><circle cx="14" cy="52" r="5" fill="#B3261E"/></svg>';
const ICON_NAVER = '<svg class="h-14 w-14 shrink-0" viewBox="0 0 56 56" aria-hidden="true"><rect width="56" height="56" rx="12" fill="#fff"/><path d="M28 43s-11-9-11-19a11 11 0 0 1 22 0c0 10-11 19-11 19z" fill="#03C75A"/><circle cx="28" cy="24" r="6" fill="#fff"/><path d="M9 47c9 0 12-5 19-5s11 3 19 3" stroke="#3B7DF3" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
const ICON_KAKAO = '<svg class="h-14 w-14 shrink-0" viewBox="0 0 56 56" aria-hidden="true"><path d="M28 52S9 36 9 22a19 19 0 0 1 38 0c0 14-19 30-19 30z" fill="#2F6FE4"/><circle cx="28" cy="22" r="8" fill="#F6E23E"/></svg>';
function pageLocation(){
  return aboutTop('loc') + `
  <section class="bg-white pb-20 pt-10 md:pb-28 md:pt-12">
    <div class="${WRAP}">
      <div class="relative aspect-[16/10] overflow-hidden border border-rule bg-plate md:aspect-[16/8]">
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center" aria-hidden="true"><svg class="h-11 w-11 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg><span class="font-serif text-s3 font-semibold">(주)스케치금속건설</span></div>
        <div id="kmap" class="absolute inset-0" role="region" aria-label="스케치금속건설 위치 지도"></div>
      </div>
      <div class="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-6 border-y-[3px] border-navy bg-mist px-6 py-8 text-center md:gap-10">
        ${SIGN}
        <div class="text-s3 font-medium leading-[1.7] md:text-s4"><p>${SITE.address}</p><p>T. ${SITE.tel}</p></div>
      </div>
      <div class="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
        <a href="${SITE.naver}" target="_blank" rel="noopener" class="map-app map-naver">${ICON_NAVER}<span><b>네이버지도</b><b>바로가기 &gt;</b></span></a>
        <a href="${SITE.kakao}" target="_blank" rel="noopener" class="map-app map-kakao">${ICON_KAKAO}<span><b>카카오맵</b><b>바로가기 &gt;</b></span></a>
      </div>
    </div>
  </section>`;
}
/* 카카오맵: SITE.kakaoMapKey 를 넣으면 실제 지도가 뜨고 주소 위치에 마커가 찍힙니다 */
function loadKakaoSdk(key){
  return new Promise((resolve,reject)=>{
    if(window.kakao && window.kakao.maps){ window.kakao.maps.load(resolve); return; }
    const sc=document.createElement('script');
    sc.src='https://dapi.kakao.com/v2/maps/sdk.js?appkey='+encodeURIComponent(key)+'&libraries=services&autoload=false';
    sc.onload=()=>{ try{ window.kakao.maps.load(resolve); }catch(e){ reject(e); } };
    sc.onerror=reject;
    document.head.appendChild(sc);
  });
}
let kmapResize=null;
async function initKakaoMap(){
  const el=$('#kmap'); if(!el) return;
  if(kmapResize){ removeEventListener('resize',kmapResize); kmapResize=null; }
  if(!SITE.kakaoMapKey) return;          /* 키가 없으면 안내 카드만 보입니다 */
  try{
    await loadKakaoSdk(SITE.kakaoMapKey);
    if(!document.body.contains(el)) return;
    const k=window.kakao.maps;
    const map=new k.Map(el,{center:new k.LatLng(35.1595,129.0620),level:3});
    map.addControl(new k.ZoomControl(),k.ControlPosition.RIGHT);
    const put=(y,x)=>{
      const pos=new k.LatLng(y,x);
      new k.Marker({map,position:pos});
      new k.CustomOverlay({map,position:pos,yAnchor:2.4,content:'<div class="kmap-label">(주)스케치금속건설</div>'});
      map.setCenter(pos);
      kmapResize=()=>{ map.relayout(); map.setCenter(pos); };
      addEventListener('resize',kmapResize,{passive:true});
    };
    if(SITE.lat && SITE.lng){ put(SITE.lat,SITE.lng); return; }
    new k.services.Geocoder().addressSearch(SITE.mapAddress,(res,status)=>{
      if(status===k.services.Status.OK && res && res.length) put(res[0].y,res[0].x);
      else el.innerHTML='';               /* 주소를 못 찾으면 지도를 지우고 안내 카드로 되돌립니다 */
    });
  }catch(err){ el.innerHTML=''; }
}

/* ============ 시공사례 ============ */
function pageWorks(slug){
  if(!TABNAME[slug]) slug='all';
  const t = TABS.find(t=>t.slug===slug);
  const tabs = TABS.map(x=>`<a href="#/works/${x.slug}" ${x.slug===slug?'aria-current="page"':''} class="shrink-0 border-b-[3px] border-transparent px-3 py-4 text-s1 font-bold text-ink2 transition-colors hover:text-ink aria-[current=page]:border-gold aria-[current=page]:text-ink lg:px-3.5">${x.name}<span class="ml-1.5 text-s0 font-medium">${tabCount(x.slug)}</span></a>`).join('');
  let body;
  if(slug==='clients'){
    const chips = CLIENTS.map((g,gi)=>`<a href="#/works/clients" data-jump="grp${gi}" class="border border-ink px-4 py-2 text-s1 font-bold transition-colors hover:bg-ink hover:text-paper">${g.name}<span class="ml-1.5 font-medium text-ink2">${g.ids.length}</span></a>`).join('');
    body = `<div class="mb-10 flex flex-wrap gap-2" aria-label="시공처 바로가기">${chips}</div>` + CLIENTS.map((g,gi)=>`<div id="grp${gi}" class="grp ${gi?'mt-16':''}"><h2 class="mb-6 border-b-2 border-ink pb-3 text-s4 font-bold tracking-[-0.02em]">${g.name}</h2><div class="${WORKS_GRID}">${g.ids.map(id=>caseCard(BY[id],'clients')).join('')}</div></div>`).join('');
  } else {
    body = `<div class="${WORKS_GRID}">${casesOf(slug).map(c=>caseCard(c,slug)).join('')}</div>`;
  }
  return banner('시공사례', t.line, 'c50_0') + `
  <div id="worksTop" class="sticky top-16 z-30 border-b border-rule bg-paper"><nav class="${WRAP} flex overflow-x-auto" aria-label="시공사례 분류">${tabs}</nav></div>
  <div class="${WRAP} pb-24 pt-10 md:pb-32">${body}</div>`;
}

/* ============ 시공사례 상세 ============ */
let GAL={id:'',i:0};
function pageCase(id,from){
  const c = BY[id]; if(!c) return pageWorks('all');
  const fromSlug = TABNAME[from]?from:c.tab;
  const list = casesOf(fromSlug); const k = list.findIndex(x=>x.id===id);
  const prev = k>0?list[k-1]:null, next = k>=0&&k<list.length-1?list[k+1]:null;
  GAL={id,i:0};
  const grp = groupOf(id);
  const nav = (x,label)=> x?`<a href="#/case/${x.id}?from=${fromSlug}" class="group grid grid-cols-[5.5rem_1fr] items-center gap-4 border border-rule p-3 transition-colors hover:border-ink"><span class="block aspect-[4/3] overflow-hidden bg-plate"><img src="${IMG[x.imgs[0]]}" alt="" class="h-full w-full object-cover" decoding="async"></span><span><span class="block text-s0 text-ink2">${label}</span><b class="block text-s1 font-bold leading-snug group-hover:underline group-hover:decoration-gold-deep group-hover:decoration-[1.5px] group-hover:underline-offset-4">${x.title}</b></span></a>`:'<span></span>';
  const multi = c.imgs.length>1;
  return `
  <div class="border-b border-rule"><div class="${WRAP} pb-8 pt-10 md:pt-14">
    <nav class="flex flex-wrap items-center gap-2 text-s1 text-ink2" aria-label="현재 위치"><a href="#/works/all" class="hover:text-ink hover:underline">시공사례</a><span aria-hidden="true">/</span><a href="#/works/${fromSlug}" class="hover:text-ink hover:underline">${TABNAME[fromSlug]}</a></nav>
    <h1 class="mt-4 text-s6 font-bold leading-[1.15] tracking-[-0.02em] md:text-s7">${c.title}</h1>
  </div></div>
  <section class="${WRAP} grid items-start gap-10 pb-20 pt-10 md:grid-cols-12 md:pb-28">
    <div class="min-w-0 md:col-span-8">
      <div class="relative aspect-[4/3] overflow-hidden bg-plate">
        <img id="galImg" src="${IMG[c.imgs[0]]}" alt="${c.title} 1" class="absolute inset-0 h-full w-full object-contain" decoding="async">
        ${multi?`<button data-gstep="-1" class="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ink bg-paper hover:bg-ink hover:text-paper" aria-label="이전 사진"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button data-gstep="1" class="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ink bg-paper hover:bg-ink hover:text-paper" aria-label="다음 사진"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>`:''}
        <span id="galCount" class="absolute bottom-3 right-3 bg-paper px-2.5 py-1 text-s0 text-ink2">${multi?`1 / ${c.imgs.length}`:''}</span>
      </div>
      ${multi?`<div class="mt-3 flex gap-2 overflow-x-auto pb-1" id="galThumbs">${c.imgs.map((s,i)=>`<button data-gi="${i}" aria-label="사진 ${i+1}" aria-current="${i===0}" class="h-16 w-20 shrink-0 overflow-hidden border-2 border-transparent opacity-60 transition aria-[current=true]:border-ink aria-[current=true]:opacity-100 hover:opacity-100"><img src="${IMG[s]}" alt="" class="h-full w-full object-cover"></button>`).join('')}</div>`:''}
    </div>
    <aside class="min-w-0 md:sticky md:top-24 md:col-span-4">
      <dl class="border-t-2 border-ink">
        <div class="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3.5 text-s1"><dt class="text-ink2">분야</dt><dd><a href="#/works/${c.tab}" class="font-bold underline decoration-ink decoration-[1.5px] underline-offset-4 hover:text-navy hover:decoration-gold-deep">${TABNAME[c.tab]}</a></dd></div>
        ${grp?`<div class="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3.5 text-s1"><dt class="text-ink2">시공처</dt><dd><a href="#/works/clients" class="font-bold underline decoration-ink decoration-[1.5px] underline-offset-4 hover:text-navy hover:decoration-gold-deep">${grp}</a></dd></div>`:''}
        <div class="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3.5 text-s1"><dt class="text-ink2">사진</dt><dd>${c.imgs.length}장</dd></div>
      </dl>
      <a href="#/contact?area=${c.tab}" class="${BTN} mt-8 w-full">이 공사 문의하기</a>
      <a href="#/works/${fromSlug}" class="${LINK} mt-5 inline-block text-s1">목록으로 돌아가기</a>
    </aside>
  </section>
  <section class="${WRAP} border-t border-rule pb-20 pt-10 md:pb-28"><div class="grid gap-4 md:grid-cols-2">${nav(prev,'이전 사례')}${nav(next,'다음 사례')}</div></section>`;
}
function galShow(i){
  const c=BY[GAL.id]; if(!c) return; GAL.i=(i+c.imgs.length)%c.imgs.length;
  const im=$('#galImg'); if(!im) return; im.src=IMG[c.imgs[GAL.i]]; im.alt=`${c.title} ${GAL.i+1}`;
  const cn=$('#galCount'); if(cn) cn.textContent=`${GAL.i+1} / ${c.imgs.length}`;
  $$('#galThumbs button').forEach((b,k)=>b.setAttribute('aria-current',String(k===GAL.i)));
}

/* ============ 견적문의 ============ */
function pageContact(area){
  const opts = AREAS.map(([v,n])=>`<option value="${v}" ${v===area?'selected':''}>${n}</option>`).join('');
  const fld = 'w-full border border-[#C4CAD1] bg-white px-4 py-3 text-s2 leading-normal text-ink placeholder:text-ink2/60 focus:border-navy';
  const lab = 'mb-2 block text-s1 font-semibold text-ink';
  const eyebrow = t => `<p class="eyebrow text-gold-deep">${t}</p>`;
  const row = (label,val,sub) => `<div class="border-b border-rule py-8 first:pt-0">${eyebrow(label)}<div class="mt-4">${val}</div>${sub?`<p class="mt-2 text-s1 leading-relaxed text-ink2">${sub}</p>`:''}</div>`;
  return `
  <section class="${WRAP} pb-24 pt-14 md:pt-20 lg:pb-32">
    <div class="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        ${eyebrow('Direct contact')}
        <h1 class="mt-5 text-s6 font-bold leading-[1.2] tracking-[-0.02em] md:text-s7">직접 연락하기<span class="text-gold-deep">.</span></h1>
        <div class="mt-12">
          ${row('전화 / Phone',`<a href="${SITE.telHref}" class="whitespace-nowrap font-display text-s5 font-semibold tracking-[-0.01em] hover:text-navy">${SITE.tel}</a>`,'대표 전화')}
          ${row('이메일 / Email',`<a href="mailto:${SITE.email}" class="break-all text-s4 font-medium hover:text-navy">${SITE.email}</a>`,'메일로도 문의를 받고 있습니다.')}
          ${row('본사 / Headquarters',`<p class="text-s3 font-medium leading-[1.5]">${SITE.address}</p>`,`<a href="#/about/location" class="${LINK} text-s1">오시는 길</a>`)}
          ${row('법인 / Corporation',`<p class="text-s3 font-medium">(주)스케치금속건설</p>`,`사업자등록번호 ${SITE.bizNo}<br>건설업등록번호 ${SITE.conNo}<br>대표 ${SITE.ceo}`)}
        </div>
      </div>
      <div class="border-l-4 border-gold bg-mist p-7 md:p-10 lg:col-span-7" id="qBox">
        <h2 class="border-b border-rule pb-6 text-s5 font-bold tracking-[-0.02em]">온라인 견적 문의</h2>
        <form id="qForm" novalidate class="mt-8 grid gap-6" aria-describedby="qNote">
          <div class="absolute -left-[9999px]" aria-hidden="true"><label>웹사이트<input id="f-web" type="text" tabindex="-1" autocomplete="off"></label></div>
          <div class="grid gap-6 sm:grid-cols-2">
            <div><label for="f-name" class="${lab}">성함 <span class="text-gold-deep" aria-hidden="true">*</span></label><input id="f-name" type="text" autocomplete="name" required class="${fld}" placeholder="홍길동" aria-describedby="e-name"><p id="e-name" class="err mt-1 text-s1" role="alert"></p></div>
            <div><label for="f-org" class="${lab}">회사 / 소속</label><input id="f-org" type="text" autocomplete="organization" class="${fld}" placeholder="(주)회사명"></div>
          </div>
          <div class="grid gap-6 sm:grid-cols-2">
            <div><label for="f-tel" class="${lab}">연락처 <span class="text-gold-deep" aria-hidden="true">*</span></label><input id="f-tel" type="tel" inputmode="tel" autocomplete="tel" required class="${fld}" placeholder="010-0000-0000" aria-describedby="e-tel"><p id="e-tel" class="err mt-1 text-s1" role="alert"></p></div>
            <div><label for="f-mail" class="${lab}">이메일</label><input id="f-mail" type="email" autocomplete="email" class="${fld}" placeholder="example@email.com" aria-describedby="e-mail"><p id="e-mail" class="err mt-1 text-s1" role="alert"></p></div>
          </div>
          <div><label for="f-area" class="${lab}">문의 영역 <span class="text-gold-deep" aria-hidden="true">*</span></label><select id="f-area" required class="${fld}" aria-describedby="e-area"><option value="">선택해 주세요</option>${opts}</select><p id="e-area" class="err mt-1 text-s1" role="alert"></p></div>
          <div><label for="f-place" class="${lab}">현장 / 프로젝트 위치</label><input id="f-place" type="text" class="${fld}" placeholder="예: 부산 해운대구"></div>
          <div><label for="f-msg" class="${lab}">문의 내용 <span class="text-gold-deep" aria-hidden="true">*</span></label><textarea id="f-msg" rows="6" required class="${fld}" placeholder="프로젝트 개요, 규모, 희망 일정 등을 입력해 주세요." aria-describedby="e-msg"></textarea><p id="e-msg" class="err mt-1 text-s1" role="alert"></p></div>
          <div><label class="flex items-start gap-3 text-s1 leading-relaxed"><input id="f-agree" type="checkbox" class="mt-1 h-5 w-5 shrink-0 accent-[#0A2A4A]" aria-describedby="e-agree"><span>개인정보 수집·이용에 동의합니다. (성함, 연락처, 이메일은 문의 회신 목적으로만 사용됩니다)</span></label><p id="e-agree" class="err mt-1 text-s1" role="alert"></p></div>
          <button id="qSubmit" type="submit" class="${BTN} w-full !py-3.5">견적 문의 보내기<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg></button>
          <p id="qNote" class="text-center text-s1 leading-relaxed text-ink2">※ 급한 문의는 전화(${SITE.tel}) 또는 이메일(${SITE.email})로 직접 연락해 주세요.</p>
        </form>
      </div>
    </div>
  </section>`;
}
const FIELD = {name:'f-name',org:'f-org',tel:'f-tel',mail:'f-mail',area:'f-area',place:'f-place',msg:'f-msg'};
function validate(fd){
  const e={};
  if(!fd.name.trim()) e.name='성함을 입력해 주세요.';
  const digits=(fd.tel.match(/\d/g)||[]).length;
  if(!fd.tel.trim()) e.tel='연락처를 입력해 주세요.'; else if(digits<9||!/^[\d\s\-+()]+$/.test(fd.tel.trim())) e.tel='숫자로 연락처를 입력해 주세요. 예: 010-0000-0000';
  if(fd.mail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.mail.trim())) e.mail='이메일 형식을 확인해 주세요.';
  if(!fd.area) e.area='문의 영역을 선택해 주세요.';
  if(!fd.msg.trim()) e.msg='문의 내용을 입력해 주세요.';
  if(!fd.agree) e.agree='개인정보 수집·이용에 동의해 주세요.';
  return e;
}
async function sendQuote(fd){
  if(!SITE.formEndpoint){ await new Promise(r=>setTimeout(r,700)); return {ok:true, demo:true}; }
  try{
    const area=(AREAS.find(a=>a[0]===fd.area)||[])[1]||'';
    const r = await fetch(SITE.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({subject:`[견적 문의] ${fd.name} / ${area}`,name:fd.name,org:fd.org,tel:fd.tel,email:fd.mail,area,place:fd.place,message:fd.msg})});
    return {ok:r.ok};
  }catch(err){ return {ok:false}; }
}
function bindForm(){
  const form=$('#qForm'); if(!form) return;
  const box=$('#qBox');
  const read=()=>({name:$('#f-name').value,org:$('#f-org').value,tel:$('#f-tel').value,mail:$('#f-mail').value,area:$('#f-area').value,place:$('#f-place').value,msg:$('#f-msg').value,agree:$('#f-agree').checked,web:$('#f-web').value});
  const ids={...FIELD,agree:'f-agree'};
  const clear=k=>{ const p=$('#e-'+k); if(p) p.textContent=''; const i=$('#'+ids[k]); if(i) i.removeAttribute('aria-invalid'); };
  ['name','tel','mail','area','msg','agree'].forEach(k=>{ const i=$('#'+ids[k]); i.addEventListener('input',()=>clear(k)); i.addEventListener('change',()=>clear(k)); });
  form.addEventListener('submit',async ev=>{
    ev.preventDefault();
    const fd=read(); const errs=validate(fd);
    ['name','tel','mail','area','msg','agree'].forEach(clear);
    const keys=Object.keys(errs);
    if(keys.length){
      keys.forEach(k=>{ $('#e-'+k).textContent=errs[k]; $('#'+ids[k]).setAttribute('aria-invalid','true'); });
      $('#'+ids[keys[0]]).focus(); return;
    }
    if(fd.web){ showQuoteDone(box,fd,true); return; }
    const btn=$('#qSubmit'); btn.disabled=true; btn.textContent='보내는 중…'; btn.classList.add('opacity-60');
    const res=await sendQuote(fd);
    if(res.ok) showQuoteDone(box,fd,res.demo);
    else showQuoteFail(box,()=>{ route(); Object.entries(FIELD).forEach(([k,id])=>{ const el=$('#'+id); if(el&&fd[k]!=null) el.value=fd[k]; }); });
  });
}
function showQuoteDone(box,fd,demo){
  const area=(AREAS.find(a=>a[0]===fd.area)||[])[1]||'';
  box.innerHTML=`<div role="status"><h2 class="text-s5 font-bold tracking-[-0.02em]">견적 문의가 접수되었습니다.</h2>
    <p class="mt-4 text-s2 text-ink2">${esc(fd.name.trim())}님, 확인 후 남겨 주신 연락처로 연락드리겠습니다.</p>
    <dl class="mt-7 border-t-2 border-ink"><div class="grid grid-cols-[6rem_1fr] gap-4 border-b border-rule py-3 text-s1"><dt class="text-ink2">문의 영역</dt><dd>${esc(area)}</dd></div><div class="grid grid-cols-[6rem_1fr] gap-4 border-b border-rule py-3 text-s1"><dt class="text-ink2">연락처</dt><dd>${esc(fd.tel.trim())}</dd></div></dl>
    <p class="mt-6 text-s1 text-ink2">급하시면 <a class="font-bold underline decoration-ink decoration-[1.5px] underline-offset-4" href="${SITE.telHref}">${SITE.tel}</a>로 전화 주세요.</p>
    ${demo?'<p class="mt-4 border-l-4 border-gold bg-plate px-4 py-3 text-s1">시안 화면입니다. 실제 메일은 발송되지 않았습니다.</p>':''}
    <div class="mt-8 flex flex-wrap gap-x-8 gap-y-3"><a href="#/" class="${BTN_LINE}">홈으로</a><a href="#/works" class="${LINK} self-center">시공사례 보기</a></div></div>`;
  box.scrollIntoView({block:'start',behavior:'smooth'});
}
function showQuoteFail(box,retry){
  box.innerHTML=`<div role="alert"><h2 class="text-s5 font-bold tracking-[-0.02em]">전송하지 못했습니다.</h2>
    <p class="mt-4 text-s2 text-ink2">잠시 후 다시 시도해 주세요. 급하시면 전화나 메일로 바로 연락해 주세요.</p>
    <p class="mt-5 text-s3"><a class="font-bold underline decoration-ink decoration-[1.5px] underline-offset-4" href="${SITE.telHref}">${SITE.tel}</a></p>
    ${SITE.email?`<p class="mt-1 text-s3"><a class="underline decoration-ink decoration-[1.5px] underline-offset-4" href="mailto:${SITE.email}">${SITE.email}</a></p>`:''}
    <button id="qRetry" class="${BTN} mt-8">다시 시도</button></div>`;
  $('#qRetry').addEventListener('click',retry);
}

/* ============ 라우터 ============ */
const TITLES = {home:'스케치금속건설 | 미대출신의 감각, 금속기술의 완성', about:'인사말', why:'WHY SKETCH METAL', loc:'오시는 길', works:'시공사례', case:'시공사례', contact:'견적문의'};
let lastKey='', lastHash='';
const scrollMemo={};
function parseHash(){
  const raw=location.hash.replace(/^#\/?/,''); const [ps,qs='']=raw.split('?');
  return {parts:ps.split('/').filter(Boolean), q:Object.fromEntries(new URLSearchParams(qs))};
}
function route(){
  if(lastKey==='works') scrollMemo[lastHash]=scrollY;
  if(logoCleanup){ logoCleanup(); logoCleanup=null; }
  const {parts,q}=parseHash(); const [p0,p1]=parts;
  let key='home', html;
  if(p0==='about'){
    if(p1==='why'){key='why';html=pageWhy();}
    else if(p1==='location'){key='loc';html=pageLocation();}
    else {key='about';html=pageGreeting();}
  } else if(p0==='works'){ key='works'; html=pageWorks(p1||'all'); }
  else if(p0==='case'){ key='case'; html=pageCase(p1,q.from); }
  else if(p0==='contact'){ key='contact'; html=pageContact(q.area); }
  else { html=pageHome(); }
  const prevKey=lastKey, curHash=location.hash;
  app.innerHTML = html;
  document.title = key==='home' ? TITLES.home : `${(key==='case'&&BY[p1])?BY[p1].title:TITLES[key]} | ${SITE.name}`;
  const navKey = ['about','why','loc'].includes(key)?'about':(key==='case'?'works':key);
  $$('[data-nav]').forEach(a=>{ a.dataset.nav===navKey ? a.setAttribute('aria-current','page') : a.removeAttribute('aria-current'); });
  closeMenu();
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(key==='works' && prevKey==='works'){
    const y = $('#worksTop').getBoundingClientRect().top + scrollY - $('header').offsetHeight;
    scrollTo({top:Math.max(0,y), behavior: reduce?'instant':'smooth'});
  } else if(key==='works' && prevKey==='case' && scrollMemo[curHash]!=null){
    scrollTo({top:scrollMemo[curHash],behavior:'instant'});
  } else { scrollTo({top:0,behavior:'instant'}); }
  lastKey=key; lastHash=curHash;
  app.focus({preventScroll:true});
  $('#bar').classList.toggle('hidden', key==='contact');
  bindPage(); bindForm(); setupReveal(); initKakaoMap(); if(key==='home') initLogo3D();
}
addEventListener('hashchange', route);

/* ============ 상단 가로 메뉴 (마우스를 올리면 검은 띠로 펼쳐짐) ============ */
const hdr = $('#hdr');
hdr.addEventListener('click',e=>{ if(e.target.closest('.mega a')){ hdr.classList.add('mega-off'); if(document.activeElement) document.activeElement.blur(); } });
hdr.addEventListener('mouseleave',()=>hdr.classList.remove('mega-off'));
addEventListener('keydown',e=>{ if(e.key==='Escape'){ hdr.classList.add('mega-off'); if(hdr.contains(document.activeElement)) document.activeElement.blur(); } });
hdr.addEventListener('focusin',e=>{ if(!e.target.closest('.mega')&&!e.target.closest('.nav-item')) return; hdr.classList.remove('mega-off'); });
$('#toTop').addEventListener('click',()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));

/* ============ 메뉴 ============ */
const menuBtn = $('#menuBtn'), mnav = $('#mnav');
function closeMenu(){ mnav.classList.add('hidden'); menuBtn.setAttribute('aria-expanded','false'); menuBtn.textContent='메뉴'; document.body.style.overflow=''; }
menuBtn.addEventListener('click',()=>{
  const open = mnav.classList.toggle('hidden')===false;
  menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.textContent = open?'닫기':'메뉴';
  document.body.style.overflow = open?'hidden':'';
});
mnav.addEventListener('click',e=>{ if(e.target.closest('a')) closeMenu(); });
mnav.classList.add('flex');

/* ============ 등장 효과, 메이슨리, 하단 바 ============ */
let io;
function setupReveal(){
  if(io) io.disconnect();
  io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('[data-reveal]').forEach(el=>io.observe(el));
}
new IntersectionObserver(es=>{ es.forEach(e=>{ $('#bar').classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top<0); }); }).observe($('#sentinel'));

/* ============ 3D 로고 (첫 화면) ============ */
let logoRaf=0, logoCleanup=null;
function initLogo3D(){
  const stage=$('#logoStage'); if(!stage) return;
  if(!window.THREE) return;
  const canvas=$('#logoCanvas'), fb=$('#logoFallback');
  let renderer;
  try{ renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'}); }catch(err){ return; }
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  renderer.outputEncoding=THREE.sRGBEncoding;
  const scene=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(26,1,0.1,50); cam.position.set(0,0,2.9);
  const {w,h,pts}=LOGO_CONTOUR;
  const shape=new THREE.Shape();
  pts.forEach(([x,y],i)=>{ const X=(x-w/2)/h, Y=(h/2-y)/h; i?shape.lineTo(X,Y):shape.moveTo(X,Y); });
  const D=0.055;
  const geo=new THREE.ExtrudeGeometry(shape,{depth:D,bevelEnabled:true,bevelThickness:0.006,bevelSize:0.003,bevelSegments:2,curveSegments:1});
  geo.translate(0,0,-D/2);
  const tex=new THREE.Texture(); tex.encoding=THREE.sRGBEncoding; tex.repeat.set(h/w,1); tex.offset.set(0.5,0.5); tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
  const front=new THREE.MeshBasicMaterial({map:tex,transparent:true,alphaTest:0.03});
  const side=new THREE.MeshStandardMaterial({color:0xa27a2c,metalness:0.6,roughness:0.42});
  const mesh=new THREE.Mesh(geo,[front,side]); const group=new THREE.Group(); group.add(mesh); scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff,0.75));
  const key=new THREE.DirectionalLight(0xffffff,1.2); key.position.set(1.6,2.2,3); scene.add(key);
  const rim=new THREE.DirectionalLight(0xfff0d0,0.6); rim.position.set(-2,-1,-1.5); scene.add(rim);
  const resize=()=>{ const r=stage.getBoundingClientRect(); const W=Math.max(1,Math.round(r.width)),H=Math.max(1,Math.round(r.height)); renderer.setSize(W,H,false); cam.aspect=W/H; cam.updateProjectionMatrix(); if(ready) renderer.render(scene,cam); };
  const base={y:-0.38,x:0.1};
  let px=0,py=0,scrollRot=0,visible=true,ready=false; const t0=performance.now();
  const ro=new ResizeObserver(resize); ro.observe(stage); resize();
  group.rotation.set(base.x,reduce?base.y:-1.7,0); group.scale.setScalar(reduce?1:0.86);
  const onMove=e=>{ const r=stage.getBoundingClientRect(); px=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-0.5)*2)); py=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-0.5)*2)); };
  if(!reduce) addEventListener('pointermove',onMove,{passive:true});
  const heroEl=$('#hero');
  const heroIO=new IntersectionObserver(es=>{ es.forEach(e=>{ visible=e.isIntersecting; scrollRot=(1-e.intersectionRatio); if(visible&&!logoRaf&&ready&&!reduce) logoRaf=requestAnimationFrame(frame); }); },{threshold:Array.from({length:21},(_,i)=>i/20)});
  heroIO.observe(heroEl);
  function frame(now){
    if(!visible||document.hidden){ logoRaf=0; return; }
    const t=(now-t0)/1000;
    const ty=base.y+Math.sin(t*0.65)*0.3+px*0.4+scrollRot*1.1;
    const tx=base.x+py*0.16+scrollRot*0.1;
    group.rotation.y+=(ty-group.rotation.y)*0.06; group.rotation.x+=(tx-group.rotation.x)*0.06;
    const s=1-scrollRot*0.06; const cur=group.scale.x+(s-group.scale.x)*0.06; group.scale.setScalar(cur);
    renderer.render(scene,cam);
    logoRaf=requestAnimationFrame(frame);
  }
  const image=new Image();
  image.onload=()=>{
    try{
      tex.image=image; tex.needsUpdate=true; ready=true;
      renderer.render(scene,cam);
      canvas.classList.add('on'); fb.style.opacity='0';
      if(!reduce) logoRaf=requestAnimationFrame(frame);
    }catch(err){ ready=false; /* 3D를 못 쓰는 환경이면 정지된 로고 그림이 그대로 보입니다 */ }
  };
  image.src=IMG.logo;
  const vis=()=>{ if(!document.hidden&&visible&&ready&&!logoRaf&&!reduce) logoRaf=requestAnimationFrame(frame); };
  document.addEventListener('visibilitychange',vis);
  logoCleanup=()=>{ cancelAnimationFrame(logoRaf); logoRaf=0; removeEventListener('pointermove',onMove); document.removeEventListener('visibilitychange',vis); ro.disconnect(); heroIO.disconnect(); geo.dispose(); tex.dispose(); front.dispose(); side.dispose(); renderer.dispose(); };
}

/* ============ 페이지별 이벤트 ============ */
function bindPage(){
  const copy = $('#copyAddr');
  if(copy) copy.addEventListener('click', async ()=>{
    const msg = $('#copied');
    try{ await navigator.clipboard.writeText(SITE.address); msg.textContent='주소를 복사했습니다.'; }
    catch(e){ msg.textContent='복사되지 않았습니다. 주소를 직접 선택해 복사해 주세요.'; }
  });
  const toCerts = $('[data-to-certs]');
  if(toCerts) toCerts.addEventListener('click',e=>{ e.preventDefault(); location.hash='#/about'; setTimeout(()=>{ const el=$('#certs'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); },80); });
  $$('[data-jump]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); const el=document.getElementById(a.dataset.jump); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }));
}

/* ============ 사진 확대(등록증·대표 사진) ============ */
const modal = $('#modal'), mImg = $('#mImg'), mTitle = $('#mTitle');
let opener=null;
function openM(id,title,el){ opener=el; mImg.src=IMG[id]; mImg.alt=title; mTitle.textContent=title; modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.style.overflow='hidden'; $('#mClose').focus(); }
function closeM(){ modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.style.overflow=''; if(opener&&document.contains(opener)) opener.focus(); }
$('#mClose').addEventListener('click', closeM);
modal.addEventListener('click',e=>{ if(e.target===modal.children[1]) closeM(); });
addEventListener('keydown',e=>{
  if(!modal.classList.contains('hidden')){ if(e.key==='Escape') closeM(); return; }
  if(lastKey==='case'){ if(e.key==='ArrowLeft') galShow(GAL.i-1); else if(e.key==='ArrowRight') galShow(GAL.i+1); }
});
document.addEventListener('click',e=>{
  const z=e.target.closest('[data-zoom]'); if(z){ openM(z.dataset.zoom,z.dataset.title,z); return; }
  const gi=e.target.closest('[data-gi]'); if(gi){ galShow(+gi.dataset.gi); return; }
  const gs=e.target.closest('[data-gstep]'); if(gs){ galShow(GAL.i+(+gs.dataset.gstep)); }
});
let tx=null;
document.addEventListener('touchstart',e=>{ if(e.target.closest('#galImg')) tx=e.touches[0].clientX; },{passive:true});
document.addEventListener('touchend',e=>{ if(tx===null) return; const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>50) galShow(GAL.i+(dx<0?1:-1)); tx=null; });
$('#skip').addEventListener('click',e=>{ e.preventDefault(); app.focus(); app.scrollIntoView(); });

route();
