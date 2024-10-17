// 파일 확장자를 포함한 긴 랜덤 문자열 생성 함수
export function generateRandomStringWithExtension(filename) {
    const extension = filename.split(".").pop().toLowerCase();
    const randomPart = Array(3)
        .fill(0)
        .map(() => Math.random().toString(36).substring(2))
        .join("");
    return `${randomPart}.${extension}`;
}
