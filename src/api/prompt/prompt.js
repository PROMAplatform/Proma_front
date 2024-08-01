import { sendRequest } from "../request";
import { promptInstance } from "../instance";

export const usePromptHook = () => {
  // 비동기 데이터 가져오기 함수
  // async()/await() 함수를 써서, 기존에 설정해두었던 instance 를 활용해
  // baseURL + /data 의 링크에서 get을 실행해준다.
  // const fetchBlocks = async () => {
  //   await sendRequest(
  //     promptInstance,
  //     "get",
  //     `/block?promptMethod="task/research"`
  //   );
  //   setPrompts(response.data.responseDto);
  //   //return 은 단지 잘 왔나 확인할 때 쓰는 용도
  //   return prompts;
  // };

  const makeBlock = async (
    blockValue,
    blockDescription,
    blockCategory,
    promptMethod
  ) => {
    await sendRequest(promptInstance, "post", `/block/save`, {
      blockValue,
      blockDescription,
      blockCategory,
      promptMethod,
    });
  };

  const savePrompt = async (
    promptTitle,
    promptDescription,
    promptPreview,
    promptCategory,
    promptMethod,
    listPromptAtom
  ) => {
    await sendRequest(promptInstance, "post", `/save`, {
      promptTitle,
      promptDescription,
      promptPreview,
      promptCategory,
      promptMethod,
      listPromptAtom,
    });
  };

  const trimPrompt = async (
    blockValue,
    blockDescription,
    blockCategory,
    promptMethod
  ) => {
    await sendRequest(promptInstance, "post", `/block/save`, {
      blockValue,
      blockDescription,
      blockCategory,
      promptMethod,
    });
  };

  return {
    makeBlock,
    savePrompt,
    trimPrompt,
  };
};
