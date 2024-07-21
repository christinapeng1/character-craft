import { Menu } from "antd";
import { BookOutlined, BarsOutlined } from "@ant-design/icons";

const MenuList = ({ darkTheme, onChatSelect, characterNames = [] }) => {
  const characterItems = characterNames.map((name) => ({
    label: name,
    key: name,
  }));

  const handleClick = (e) => {
    onChatSelect(e.key);
  };

  const menuItems = [
    {
      label: "Story",
      key: "story",
      icon: <BookOutlined />,
    },
    {
      label: "Characters",
      key: "characters",
      icon: <BarsOutlined />,
      children: characterItems,
    },
  ];

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      items={menuItems}
      onClick={handleClick}
      style={{ maxHeight: "88vh", overflowY: "auto" }}
    />
  );
};

export default MenuList;
