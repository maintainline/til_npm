# 카카오 로그인

- CRA 로 리액트 프로젝트 생성한 경우
  - 환경 설정 즉, `.env` 사용법이 다름
- Vite 로 리액트 프로젝트 생성한 경우
  - 환경 설정 즉, `.env` 사용법이 다름

## 1. 카카오 개발자 등록하기 / 로그인하기

- https://developers.kakao.com/
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 어플리케이션 등록하기

- 상단에 `앱` 메뉴 클릭
  <img width="1241" height="385" alt="Image" src="https://github.com/user-attachments/assets/1a718019-9ceb-4766-9b28-5e163b5813ec" />
- 내용 작성하기
  <img width="1224" height="897" alt="Image" src="https://github.com/user-attachments/assets/ad3ddd43-c57a-4373-8434-5be0d6d5d512" />
  <img width="1196" height="916" alt="Image" src="https://github.com/user-attachments/assets/6885cd5c-c069-4bc5-b564-793abb428ccf" />
- 생성된 목록 확인하기
  <img width="1206" height="464" alt="Image" src="https://github.com/user-attachments/assets/7c3ed14c-cf3b-456d-b9c1-65e298c61757" />
- 비즈앱 등록하기
  <img width="888" height="949" alt="Image" src="https://github.com/user-attachments/assets/e8a916c8-034a-4c48-a07b-04b9a4fb96eb" />
  <img width="1293" height="915" alt="Image" src="https://github.com/user-attachments/assets/deaba734-f3a8-4ce1-b1a8-f1ca2eac73ab" />

## 3. Rest API 키 JS 키 관리하기

- `외부노출 금지`
  <img width="664" height="419" alt="Image" src="https://github.com/user-attachments/assets/26335c4d-53f6-4576-8c12-c4d5f550e562" />
- / 폴더에 `.env` 파일 생성
- `생성되는 파일 위치 절대 주의` src 에 만들면 안됩니다.
  <img width="372" height="491" alt="Image" src="https://github.com/user-attachments/assets/f8490dfa-4775-4bac-800e-c9271ed480af" />

### 3.1 접두어는 `REACT_APP_` 으로 `약속`됨

- 예) Next.js 프로젝트에서는 `NEXT_APP_`으로 약속
- 예) Vite 프로젝트에서는 `VITE_`으로 약속

```txt
REACT_APP_KAKAO_LOGIN_REST_API_KEY=본인키
REACT_APP_KAKAO_LOGIN_JS_API_KEY=본인키
```

### 3.2. `.gitignore` 확인

- `.env` 내용으로 작성확인
  <img width="426" height="461" alt="Image" src="https://github.com/user-attachments/assets/122a6f81-ece0-4e2f-9029-c3e380b44a97" />

## 4. 카카오 로그인 플랫폼 설정하기

<img width="1010" height="785" alt="Image" src="https://github.com/user-attachments/assets/b8202ec8-26ef-45c8-b392-2c9416c4c333" />
<img width="782" height="500" alt="Image" src="https://github.com/user-attachments/assets/a4f13fe9-289e-41d1-ac09-14be55631102" />

### 4.1 리 다이렉트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인
  <img width="942" height="578" alt="Image" src="https://github.com/user-attachments/assets/65ed6768-49bf-44f9-9a2e-8176a49b804d" />

## 5. 동의항목에 동의

<img width="1358" height="617" alt="Image" src="https://github.com/user-attachments/assets/4c297fb7-5719-450d-946a-77a4c8fb5167" />
<img width="1326" height="454" alt="Image" src="https://github.com/user-attachments/assets/1eee92d8-7f5d-4091-a095-f31d1163003b" />

## 6. 카카오 로그인 구현

- /src/kakao 폴더 생성
- /src/kakao/kakaoapi.js

  ### 6.1. 1 단계

```js
//git 에 key 값 공개 금지!
const rest_api_key = process.env.REACT_APP_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 url
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인시 API 호출 경로 :token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
//카카오 로그인 이후 사용자 정보 API 경로
const kakao_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 url 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : Access Token 활용

- 정보호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kakao_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드 (`추후 axios 로 변경 권장`)

```js
//git 에 key 값 공개 금지!
const rest_api_key = process.env.REACT_APP_LOGIN_REST_API_KEY;
// 카카오 로그인 성공시 이동할 url
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인시 API 호출 경로 :token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
//카카오 로그인 이후 사용자 정보 API 경로
const kakao_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인 시도시 활용할 url 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kakao_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

## 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kakao/kakaoapi";

function LoginPage() {
  // 카카오 로그인 URL 만들기
  const kakaoLoginUrl = getKakaoLoginLink();
  console.log(kakaoLoginUrl);
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kakaoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 생성

```jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kakao/kakaoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KAKAO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

### 6.4.1. Router 셋팅

- /src/App.js

```js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="/member/kakao" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. Recoil 활용해 보기

- /src/atoms/kakaoLoginAtom.js 생성

```js
import { atom } from "recoil";

export const KakaoLoginAtom = atom({
  key: "KakaoLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그아웃 처리

```jsx
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kakao/kakaoapi";
import { useRecoilState } from "recoil";
import { KakaoLoginAtom } from "../atoms/kakaoLoginAtom";

function LoginPage() {
  const navigate = useNavigate();
  //recoil state 로 전역 상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(KakaoLoginAtom);
  // 카카오 로그인 URL 만들기
  const kakaoLoginUrl = getKakaoLoginLink();
  // console.log(kakaoLoginUrl);
  const LogOut = () => {
    setUserInfo({
      id: "",
      nickname: "",
      email: "",
      thumbnail_image_url: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={LogOut}>로그아웃</button>
      ) : (
        <Link to={kakaoLoginUrl}>카카오 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/login")
- 조건문으로 안내메세지 및 버튼으로 이동권장
