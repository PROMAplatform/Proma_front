import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import useEmojiPicker from "../../hooks/common/useEmojiPicker";
import EmojiPicker from "emoji-picker-react";

function EmojiPcikerButton() {
  const { chosenEmoji, showPicker, onEmojiClick, togglePicker, setShowPicker } =
    useEmojiPicker();
  const buttonRef = useRef(null);
  const pickerRef = useRef(null);
  const [pickerStyle, setPickerStyle] = useState({ display: "none" }); // 초기에는 숨김

  useEffect(() => {
    if (showPicker && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      setPickerStyle({
        position: "absolute",
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.right + window.scrollX,
        display: "block", // 표시
      });
    } else {
      setPickerStyle({ display: "none" }); // 숨김
    }
  }, [showPicker]);

  const handleEmojiClick = (event, emojiObject) => {
    onEmojiClick(event, emojiObject); // useEmojiPicker 훅의 onEmojiClick 호출
    setShowPicker(false);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={togglePicker}
        style={{ backgroundColor: "white", border: "none" }}
      >
        {chosenEmoji == null ? "💡" : <span>{chosenEmoji}</span>}
      </button>

      {createPortal(
        <div ref={pickerRef} style={pickerStyle}>
          <EmojiPicker // EmojiPicker를 EmojiPickerWrapper로 감싸기
            onEmojiClick={handleEmojiClick}
            pickerStyle={{ width: "300px" }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

export default EmojiPcikerButton;
