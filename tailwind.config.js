module.exports = {
  content: ['./index.html','./assets/js/**/*.js'],
  theme: {
    extend: {
      colors: { paper:'#FFFFFF', plate:'#EAEEF2', mist:'#F2F5F8', ink:'#15181B', ink2:'#4E5761', rule:'#D3D9DF',
        navy:{ DEFAULT:'#0A2A4A', 800:'#0F3760', 900:'#061C33' }, steel:'#22272C', coal:'#111315',
        gold:{ DEFAULT:'#F0B429', soft:'#FBCF6A', deep:'#8F6210' }, brand:{ DEFAULT:'#0168B5' }, sun:'#FAD167' },
      fontWeight: { bold:'600' },
      fontFamily: {
        sans: ['SKSans','"Noto Sans KR"','"Apple SD Gothic Neo"','"Malgun Gothic"','system-ui','sans-serif'],
        display: ['SKSerif','"Noto Serif KR"','serif'],
        serif: ['SKSerif','"Noto Serif KR"','serif'],
      },
      fontSize: {
        s0:['0.8125rem','1.5'], s1:['0.9375rem','1.65'], s2:['1.0625rem','1.8'], s3:['1.25rem','1.6'],
        s4:['1.5rem','1.35'], s5:['1.875rem','1.3'], s6:['2.25rem','1.25'], s7:['2.875rem','1.2'], s8:['3.5rem','1.15'],
      },
    },
  },
  plugins: [],
};
