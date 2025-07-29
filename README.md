# swiper

- https://swiperjs.com/react
- https://swiperjs.com/demos

## 설치

```bash
npm i swiper
```

## 폴더 구성

- /src/pages/Slide.jsx 파일 생성

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본작업
import "swiper/css";
// 개별작업
import "./slide.css";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

- /src/pages/slide.css 파일 생성

```css
.visual-slide {
  width: 80%;
  margin: 0 auto;
  background-color: skyblue;
  min-height: 200px;
}
.sw-visual {
  width: 100%;
  height: 100%;
}
```

## 1. loop와 navigation 적용 예제

- 1. 단계 : css 와 모듈을 확인/추가한다.

```jsx
// css 와  모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
```

- 2. 단계 : modules 적용

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본작업
import "swiper/css";
// 개별작업
import "./slide.css";

// css 와  모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```
