import { useContext, useEffect } from "react";
import { Center } from "../../components/PublicStyle";
import AxiosApi from "../../api/Axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PayContext } from "../../context/Paystore";
import Common from "../../utill/Common";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const context = useContext(PayContext);
    const { setKakaoId, setKakaoPw } = context;

  useEffect(() => {
    const AuthReg = async () => {
      console.log(searchParams.get("code"));
      try {
        const resp = await AxiosApi.KakaoLogin(searchParams.get("code"));
        const idMatch = resp.data.match(/id='([^']+)'/);
        const kakaoId = idMatch ? idMatch[1] : null;
        const kakaoEmailMatch = resp.data.match(/email='([^']+)'/);
        const kakaoEmail = kakaoEmailMatch ? kakaoEmailMatch[1] : null;
        setKakaoId(kakaoEmail);
        setKakaoPw(kakaoId);
        const rsp = await AxiosApi.SingupIdCheck(kakaoEmail);
        if (resp.status === 200) {
            console.log(kakaoEmail);
            console.log("Kakao ID:", kakaoId);
            console.log(resp.data);
            if (rsp.data === true) {
                // 회원가입 페이지로 이동
                navigate("/signup"); // 실제 경로에 맞게 수정
            } else {
                // 메인 페이지로 이동
              try {
                const res = await AxiosApi.Login(kakaoEmail, kakaoId);
                if (res.data.grantType === "Bearer") {
                    Common.setAccessToken(res.data.accessToken);
                    Common.setRefreshToken(res.data.refreshToken);
                    navigate("/");
                  } else {
                    navigate("/");
                  }
                } catch (err) {
                  console.log(err);
                  navigate("/");
                }
              }
        } else {
          console.log("실패했습니다.");
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    };
    AuthReg();
  }, []);

  return (
    <>
      <Center>
        <div>카카오톡 로그인 중 입니다...</div>
      </Center>
    </>
  );
};

export default Auth;
