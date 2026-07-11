declare module 'swiper/css' {
  const content: any;
  export default content;
}

// 혹시 다른 swiper 관련 css 에러가 추가로 뜬다면 이것도 넣으세요
declare module 'swiper/css/*' {
  const content: any;
  export default content;
}