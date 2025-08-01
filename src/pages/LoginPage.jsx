import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kakao/kakaoapi";
import { useRecoilState } from "recoil";
import { KakaoLoginAtom } from "../atoms/kakaoLoginAtom";
import { getGoogleLoginLink } from "../google/googleapi";

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

  const googleLogin = () => {
    getGoogleLoginLink();
    
  };

  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={LogOut}>로그아웃</button>
      ) : (
        <Link to={kakaoLoginUrl}>카카오 로그인</Link>
      )}
      <div>
        <button onClick={googleLogin}>구글 로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
