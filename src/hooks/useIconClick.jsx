import { useState } from "react";

function useIconClick(onClick) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // 클릭 시 상태 변경 (선택적)
    onClick(); // 전달받은 onClick 함수 실행
  };

  return { handleClick, isActive };
}

export default useIconClick;
