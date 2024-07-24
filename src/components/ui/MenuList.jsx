import { Menu } from "antd";
import { BookOutlined, BarsOutlined } from "@ant-design/icons";

const MenuList = ({
  darkTheme,
  onChatSelect,
  chatGroupsData
}) => {

  const chatGroupItems = chatGroupsData.map((group) => ({
    label: group.label,
    key: group.id,
  }));

  const handleClick = (e) => {
    onChatSelect(e.key, e.domEvent);
  };

  const menuItems = [
    {
      label: "Story",
      key: "story",
      icon: <BookOutlined />,
    },
    {
      label: "Chats",
      key: "chats",
      icon: <BarsOutlined />,
      children: chatGroupItems,
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
