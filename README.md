# 스케치금속건설 홈페이지

(주)스케치금속건설 회사 홈페이지입니다. 서버와 DB가 없는 **정적 사이트**라서 폴더째로 올리면 바로 동작합니다.

## 폴더 구조

```
index.html              페이지 뼈대 (상단 메뉴, 하단 바, 모바일 하단 버튼)
assets/
  js/app.js             화면 구성과 동작 (회사 정보·사례 목록·문구가 여기 있습니다)
  js/images.js          사진 경로 목록
  css/tailwind.css      자동 생성된 스타일 (직접 고치지 않습니다)
  css/custom.css        직접 만든 스타일 (색 면, 3D 로고 자리, 가로 메뉴, 버튼 효과)
  css/fonts.css         글꼴 등록
  fonts/                글꼴 파일 (사이트에 쓰인 글자만 담은 가벼운 버전)
  img/works/            시공사례 사진 132장
  img/company/          대표 사진, 사업자등록증, 건설업등록증
  img/brand/            로고, 상호명, 파비콘
src/input.css           스타일 재생성용 입력 파일
tailwind.config.js      색·글꼴 크기 등 디자인 값
```

## 내 컴퓨터에서 미리 보기

```
python3 -m http.server 8000
```

주소창에 `http://localhost:8000` 을 입력하세요. `index.html` 을 더블클릭으로 열면 3D 로고가 움직이지 않고 그림으로만 보일 수 있습니다.

## 배포

- **GitHub Pages**: 저장소 Settings → Pages → Branch 를 `main`, 폴더를 `/ (root)` 로 선택 → 저장. 잠시 뒤 `https://shimhaeun-1215.github.io/sketchmetal/` 로 열립니다.
- **Netlify / Vercel / 일반 호스팅**: 이 폴더 전체를 그대로 올리면 됩니다. 별도 빌드가 필요 없습니다.

## 자주 고치는 곳 (모두 `assets/js/app.js`)

| 바꾸고 싶은 것 | 위치 |
|---|---|
| 전화, 주소, 대표, 등록번호, 이메일 | 맨 위 `SITE` |
| 시공사례 추가·삭제·제목 수정 | `CASES` (예: `C('c60','stairs','제목')`) |
| 주요 시공처 탭에 묶이는 사례 | `CLIENTS` |
| 홈의 주요 시공처 3곳 | `TOP3` |
| 전체 탭 맨 앞에 보이는 대표 사례 | `FEATURED` |
| 페이지 문구 | 해당 `pageHome`, `pageGreeting`, `pageWhy` 등 함수 |

**시공사례 추가 방법**

1. 사진을 `assets/img/works/` 에 넣습니다. (webp, 긴 변 1000px 안팎 권장. 파일명은 `c60_0.webp`, `c60_1.webp` 처럼)
2. `assets/js/images.js` 에 `IMG` 한 줄, `META` 에 사진 목록, `AR` 에 대표 사진 가로÷세로 비율을 추가합니다.
3. `app.js` 의 `CASES` 에 한 줄을 추가합니다. 분야 값은 `structures`, `stairs`, `windows`, `canopy`, `custom`, `safety` 중 하나입니다.

탭에 표시되는 사례 수는 자동으로 계산됩니다.

## 견적 문의 메일 연결

지금은 `SITE.formEndpoint` 가 비어 있어서 "시안 화면입니다" 라는 접수 완료 화면만 보이고 **실제 메일은 발송되지 않습니다.** 폼 전송 서비스(또는 구글 앱스 스크립트)에서 받은 주소를 `formEndpoint` 에 넣으면 문의 내용이 대표님 메일로 전달됩니다. 문의 내용은 이 사이트에 저장되지 않습니다.

## 카카오맵 연결

오시는 길에 실제 지도와 마커를 띄우려면:

1. 카카오 개발자 사이트(developers.kakao.com)에서 앱을 만들고 **JavaScript 키**를 발급받습니다.
2. 앱 설정의 웹 플랫폼에 사이트 주소(예: 위 배포 주소)를 등록합니다.
3. `SITE.kakaoMapKey` 에 키를 넣습니다. 마커 위치는 `SITE.mapAddress` 주소로 자동 검색하고, 안 잡히면 `SITE.lat`, `SITE.lng` 에 좌표를 직접 넣습니다.

키가 없으면 지도 자리에 위치 카드가 대신 보이고, 네이버지도·카카오맵 버튼은 그대로 동작합니다.

## 스타일을 바꿀 때

HTML이나 `app.js` 에서 `text-s4`, `bg-navy` 같은 클래스를 새로 쓰거나 `tailwind.config.js` 의 색을 바꿨다면 스타일을 다시 만들어야 합니다.

```
npm install
npm run css
```

## 외부에서 불러오는 것

- 구글 글꼴 (Noto Sans KR, Noto Serif KR, Nanum Pen Script): 사이트에 포함된 글꼴 파일이 먼저 쓰이고, 없는 글자만 구글 글꼴이 채웁니다.
- three.js (cdnjs): 첫 화면 3D 로고용. 불러오지 못하면 정지된 로고 그림이 보입니다.
