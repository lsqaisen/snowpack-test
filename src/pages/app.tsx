import React, { useState } from "react";
import { ConfigProvider, DatePicker, message } from "antd";
import { useInterval } from "ahooks";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./index.css";

moment.locale("zh-cn");

const App = () => {
  const [date, setDate] = useState(null);
  const [count, setCount] = useState<number>(0);
  useInterval(() => {
    setCount(count + 1);
  }, 1000);
  const handleChange = (value: any) => {
    message.info(
      `您选择的日期是: ${value ? value.format("YYYY年MM月DD日") : "未选择"}`
    );
    setDate(value);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{ width: 400, margin: "100px auto" }}>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          当前日期：{date ? (date as any).format("YYYY年MM月DD日") : "未选择"}
        </div>
        {count}sdfsdfsdfsdfsdfsdfsdf
      </div>
    </ConfigProvider>
  );
};

export default App;
