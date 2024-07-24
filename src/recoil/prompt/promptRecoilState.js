import { atom, selector } from "recoil";

export const activeCategoryState = atom({
  key: "activeCategoryState",
  default: "역할",
});

export const activeBlocksState = atom({
  key: "activeBlocksState",
  default: {
    역할: [
      "선생님",
      "고등학생",
      "어린아이",
      "판사",
      "교수",
      "대학생",
      "요리사",
      "연예인",
      "과학자",
      "수학자",
      "직장인",
      "가수",
    ],
    형식: ["에세이", "보고서", "시", "소설", "스크립트"],
    지시: ["설명하세요", "비교하세요", "분석하세요", "요약하세요"],
    참고: ["최신 연구", "역사적 사실", "통계 데이터"],
    필수: ["키워드 포함", "특정 문장 구조 사용"],
    제외: ["비속어", "편견적 표현", "과장된 표현"],
  },
});


export const combinationsState = atom({
  key: "combinationsState",
  default: {
    역할: null,
    형식: null,
    지시: null,
    참고: null,
    필수: null,
    제외: null,
  },
});


export const categoryColorsState = atom({
  key: "categoryColorsState",
  default: {
    역할: "red",
    형식: "orange",
    지시: "yellow",
    참고: "green",
    필수: "blue",
    제외: "indigo",
  },
});


export const refinedPromptPartsState = selector({
  key: "refinedPromptPartsState",
  get: ({ get }) => {
    const combinations = get(combinationsState);

    return {
      역할: combinations["역할"] ? `당신은 ${combinations["역할"]}입니다.` : "",
      형식: combinations["형식"]
        ? `${combinations["형식"]} 형식으로 작성해주세요.`
        : "",
      지시: combinations["지시"] ? `${combinations["지시"]}` : "",
      참고: combinations["참고"]
        ? `다음을 참고하세요: ${combinations["참고"]}`
        : "",
      필수: combinations["필수"]
        ? `반드시 ${combinations["필수"]}를 포함해야 합니다.`
        : "",
      제외: combinations["제외"]
        ? `${combinations["제외"]}는 제외해주세요.`
        : "",
    };
  },
});
