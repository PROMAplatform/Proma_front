import { atom, selector } from "recoil";

// 초기 카테고리 및 블록 데이터
const initialCategories = ["역할", "형식", "지시", "참고", "필수", "제외"];
const initialBlocks = {
  역할: [
    {
      blockId: 1,
      blockTitle: "선생님",
      blockDescription: "당신은 친절하고 지식이 풍부한 선생님입니다.",
    },
    {
      blockId: 2,
      blockTitle: "학생",
      blockDescription: "당신은 호기심 많고 열심히 공부하는 학생입니다.",
    },
  ],
  형식: [
    {
      blockId: 3,
      blockTitle: "에세이",
      blockDescription: "주제에 대해 자유롭게 서술하는 형식입니다.",
    },
    {
      blockId: 4,
      blockTitle: "보고서",
      blockDescription: "구조화된 형식으로 정보를 전달합니다.",
    },
  ],
  지시: [
    {
      blockId: 5,
      blockTitle: "설명하세요",
      blockDescription: "주제에 대해 상세히 설명해주세요.",
    },
    {
      blockId: 6,
      blockTitle: "비교하세요",
      blockDescription: "두 가지 이상의 대상을 비교해주세요.",
    },
  ],
  참고: [
    {
      blockId: 7,
      blockTitle: "최신 연구",
      blockDescription: "최근의 연구 결과를 참고하세요.",
    },
    {
      blockId: 8,
      blockTitle: "역사적 사실",
      blockDescription: "관련된 역사적 사실을 고려하세요.",
    },
  ],
  필수: [
    {
      blockId: 9,
      blockTitle: "키워드 포함",
      blockDescription: "반드시 특정 키워드를 포함해야 합니다.",
    },
    {
      blockId: 10,
      blockTitle: "예시 제시",
      blockDescription: "설명에 구체적인 예시를 포함해야 합니다.",
    },
  ],
  제외: [
    {
      blockId: 11,
      blockTitle: "비속어",
      blockDescription: "비속어 사용을 피해주세요.",
    },
    {
      blockId: 12,
      blockTitle: "편견적 표현",
      blockDescription: "편견이 드러나는 표현을 사용하지 마세요.",
    },
  ],
};

// 사용 가능한 모든 카테고리 목록
export const availableCategoriesState = atom({
  key: "availableCategoriesState",
  default: initialCategories,
});

// 활성 카테고리
export const activeCategoryState = atom({
  key: "activeCategoryState",
  default: initialCategories[0],
});

// 각 카테고리별 블록 ID
export const activeBlocksState = atom({
  key: "activeBlocksState",
  default: Object.fromEntries(
    initialCategories.map((category) => [
      category,
      initialBlocks[category].map((block) => block.blockId),
    ])
  ),
});

// 선택된 조합
export const combinationsState = atom({
  key: "combinationsState",
  default: {},
});

// 카테고리별 색상
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

// 블록 세부 정보
export const blockDetailsState = atom({
  key: "blockDetailsState",
  default: Object.fromEntries(
    Object.values(initialBlocks)
      .flat()
      .map((block) => [block.blockId, block])
  ),
});

// 정제된 프롬프트 부분
export const refinedPromptPartsState = selector({
  key: "refinedPromptPartsState",
  get: ({ get }) => {
    const combinations = get(combinationsState);
    const categories = get(availableCategoriesState);
    const blockDetails = get(blockDetailsState);

    const promptParts = {};
    categories.forEach((category) => {
      if (combinations[category]) {
        const block = blockDetails[combinations[category]];
        promptParts[category] = block ? block.blockDescription : "";
      } else {
        promptParts[category] = "";
      }
    });

    return promptParts;
  },
});

// 프롬프트 전체 구조를 갱신하는 함수
export const updateEntirePromptStructure =
  ({ set }) =>
  (newPromptStructure) => {
    const { categories, blocks, combinations, colors } = newPromptStructure;

    // 카테고리 업데이트
    set(availableCategoriesState, categories);

    // 활성 카테고리 업데이트 (첫 번째 카테고리로 설정)
    set(activeCategoryState, categories[0]);

    // 각 카테고리별 블록 ID 업데이트
    set(
      activeBlocksState,
      Object.fromEntries(
        categories.map((category) => [
          category,
          blocks[category].map((block) => block.blockId),
        ])
      )
    );

    // 선택된 조합 업데이트
    set(combinationsState, combinations);

    // 카테고리별 색상 업데이트
    set(categoryColorsState, colors);

    // 블록 세부 정보 업데이트
    set(
      blockDetailsState,
      Object.fromEntries(
        Object.values(blocks)
          .flat()
          .map((block) => [block.blockId, block])
      )
    );
  };

// 새로운 함수: API 데이터로부터 프롬프트 구조 갱신
export const updatePromptStructureFromApiData =
  ({ set }) =>
  (apiData) => {
    const blocks = apiData.responseDto.selectBlock;

    // 카테고리 추출 및 중복 제거
    const categories = [...new Set(blocks.map((block) => block.blockCategory))];

    // 블록을 카테고리별로 그룹화
    const groupedBlocks = categories.reduce((acc, category) => {
      acc[category] = blocks.filter(
        (block) => block.blockCategory === category
      );
      return acc;
    }, {});

    // 색상 생성 (간단한 예시, 실제로는 더 복잡한 로직이 필요할 수 있습니다)
    const colors = categories.reduce((acc, category, index) => {
      const predefinedColors = [
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
      ];
      acc[category] = predefinedColors[index % predefinedColors.length];
      return acc;
    }, {});

    // 상태 업데이트
    set(availableCategoriesState, categories);
    set(activeCategoryState, categories[0]);
    set(
      activeBlocksState,
      Object.fromEntries(
        categories.map((category) => [
          category,
          groupedBlocks[category].map((block) => block.blockId),
        ])
      )
    );
    set(combinationsState, {}); // 초기에는 선택된 조합이 없음
    set(categoryColorsState, colors);
    set(
      blockDetailsState,
      Object.fromEntries(blocks.map((block) => [block.blockId, block]))
    );
  };

// 사용 예: 이중함수라 다음과 같이 써야함
// const updatePromptStructure = useSetRecoilState(updatePromptStructureFromApiData);
// updatePromptStructure(apiData);
