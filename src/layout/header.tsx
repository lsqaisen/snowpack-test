import React from "react";
import { Menu } from "antd";
import { BarsOutlined, HomeOutlined, FrownFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header({ location }: any) {
  console.log(location);
  return (
    <Menu selectedKeys={[]} mode="horizontal" theme="dark">
      <Menu.Item key="/users">
        <Link to="/users">
          <BarsOutlined />
          Users
        </Link>
      </Menu.Item>
      <Menu.Item key="/home">
        <Link to="/home">
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/404">
          <FrownFilled />
          404
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
