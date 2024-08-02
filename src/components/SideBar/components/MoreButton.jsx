import React, {useEffect, useState, useRef} from "react";
import CustomIconButton from "../../common/CustomIconButton";
import { ReactComponent as MoreIcon } from "../../../assets/images/moreIcon.svg";
import editIcon from "../../../assets/images/editIcon.svg";
import trashIcon from "../../../assets/images/trashIcon.svg";
import shareIcon from "../../../assets/images/shareIcon.svg";
import styled from "styled-components";
import { B6 } from "../../../styles/font-styles";

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px; 
  position: absolute;
  background-color: var(--white);
  border-radius: 13px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.20);
  z-index: 10000;
  top: ${({ position }) => position.top}px;
  left: ${({ position }) => position.left}px;
  box-sizing: border-box;
  padding: 8px;
`;

const MenuButtonComtainer = styled.div`
  width: auto;
  height: auto;
  border-radius: 5px;
  padding: 10px 15px;
  &:hover {
    background-color: var(--color-gray2);
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  white-space: nowrap;
`;

const Icon = styled.img`
  width: 18px;
`;

function MoreButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowMenu(false); // 메뉴 외부를 클릭하면 메뉴를 닫음
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if(showMenu && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: (buttonRect.bottom + buttonRect.top) / 2,
        left: buttonRect.right,
      });
    }
  }, [showMenu]);

  const handleButtonClick = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  }

  const handleEditClick = () => {
    // Handle edit action
    console.log("Edit clicked");
  };

  const handleTrashClick = () => {
    // Handle delete action
    console.log("Delete clicked");
  };

  const handleShareClick = () => {
    // Handle share action
    console.log("Share clicked");
  };

  function MenuComponent({icon, title, onClick}) {
    return (
      <MenuButtonComtainer onClick={onClick}>
        <Menu>
          <Icon src={icon} alt="icon" />
          <B6 color="gray6">{title}</B6>
        </Menu>
      </MenuButtonComtainer>
    );
  }
  
  function MenuContainer() {
    return (
      <Container ref={menuRef} position={menuPosition}>
        <MenuComponent icon={editIcon} title="수정하기" onClick={handleEditClick}/>
        <MenuComponent icon={trashIcon} title="삭제하기" onClick={handleTrashClick}/>
        <MenuComponent icon={shareIcon} title="공유하기" onClick={handleShareClick}/>
      </Container>
    )
  }

  return (
    <IconContainer ref={buttonRef}>
      <CustomIconButton 
        icon={MoreIcon}
        onClick={handleButtonClick}
      />
      {showMenu && <MenuContainer />}
    </IconContainer>
  );
}

export default MoreButton;