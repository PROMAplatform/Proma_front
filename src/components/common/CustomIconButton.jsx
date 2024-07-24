import React, { useState } from "react";
import useIconClick from "../../hooks/common/useIconClick";

function CustomIconButton({
  icon: IconComponent,
  onClick,
  useActiveState = false,
}) {
  const { handleClick, isActive } = useIconClick(onClick);
  const [isHovered, setIsHovered] = useState(false);

  const handleIconClickWithStopPropagation = (event) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    handleClick(event);
  };

  const iconColor = useActiveState
    ? isActive
      ? "blue"
      : isHovered
      ? "blue"
      : "black" // isActive 사용 시
    : isHovered
    ? "blue"
    : "black"; // isActive 미사용 시

  return (
    <IconComponent
      onClick={handleIconClickWithStopPropagation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        color: iconColor,
      }}
    />
  );
}

export default CustomIconButton;
