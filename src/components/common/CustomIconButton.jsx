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
      ? "var(--block-main-color)"
      : isHovered
      ? "var(--block-main-color)"
      : "var(--gray-6)" // isActive 사용 시
    : isHovered
    ? "var(--block-main-color)"
    : "var(--gray-6)"; // isActive 미사용 시

  return (
    <IconComponent
      onClick={handleIconClickWithStopPropagation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "18px",
        height: "18px",
        cursor: "pointer",
        color: iconColor,
        margin: "5px"
      }}
    />
  );
}

export default CustomIconButton;
