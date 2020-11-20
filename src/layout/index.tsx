import React from "react";
import Header from "./header";
import "./index.scss";

const MainLayout: React.FC<any> = ({ children, location, ...props }: any) => {
  console.log(props);
  return (
    <div className="normal">
      <Header location={location} />
      <div className="content">
        <div className="main">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
