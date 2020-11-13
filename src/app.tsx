import React, { useState } from "react";
import { Button, DatePicker, Layout, message } from "antd";
import "antd/dist/antd.css";

const App = (props: any) => {
  return (
    <Layout>
      <Layout.Content>
        <DatePicker />
        <Button
          type="primary"
          onClick={() => {
            console.log(4234);
            message.error("323sdfsdf2");
          }}
        >
          dsdsdfsdf
        </Button>
        sdfsdf
      </Layout.Content>
    </Layout>
  );
};

export default App;
