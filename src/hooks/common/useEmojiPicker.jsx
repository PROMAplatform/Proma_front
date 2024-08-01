import { useState } from "react";

function useEmojiPicker() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(event.emoji);
    setShowPicker(false); // 이모지 선택 후 Picker 닫기 (선택 사항)
  };

  const togglePicker = (event) => {
    console.log("togglePicker 실행");
    event.stopPropagation(); // 이벤트 버블링 중단
    setShowPicker(!showPicker);
  };

  return {
    chosenEmoji,
    showPicker,
    setShowPicker,
    onEmojiClick,
    togglePicker,
  };
}
export default useEmojiPicker;
