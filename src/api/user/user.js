import { useRecoilState } from "recoil";
import { sendRequest } from "../request";
import { userInstance } from "../instance";


// 비동기 데이터 가져오기 함수
// async()/await() 함수를 써서, 기존에 설정해두었던 instance 를 활용해
// baseURL + /data 의 링크에서 get을 실행해준다.
export const fetchPrompts = async () => {
  const [prompts, setPrompts] = useRecoilState(stateKey);
  try {
    const response = await sendRequest(userInstance, "get", "/prompts");
    setPrompts(response.data);
    //return 은 단지 잘 왔나 확인할 때 쓰는 용도
    return prompts;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
