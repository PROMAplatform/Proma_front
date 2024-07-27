import { useEffect } from "react";
import axios from "axios";

const api = axios.create({
  // baseURL: "", // Your API base URL
  timeout: 5000, // Optional: Set a timeout (in milliseconds)
});

// let params = new URL(window.location.href).searchParams;
// let code = params.get("code");

const KakaoAfterLogin = () => {
  useEffect(() => {
    api
      .post(``)
      .then((response) => {
        console.log("kakao Login Attempting");
        console.log(response);
        //setUserName(response.data.data.name);

        // localStorage 저장
        localStorage.setItem(
          "access_token",
          response.data.responseDto.access_token
        );
        localStorage.setItem(
          "refresh_token",
          response.data.responseDto.refresh_token
        );
        // 점포 선택 페이지로 이동
        console.log("여기에 잘 들어왔습니다.");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //location, navigate, setUserName
};

export default KakaoAfterLogin;
