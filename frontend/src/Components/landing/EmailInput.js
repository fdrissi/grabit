import React from 'react';
import { Input } from 'antd';

import 'antd/dist/antd.css';
const { Search } = Input;

export default () => {
  return (
    <div>
    <Search
      placeholder="mail@exemple.com"
      enterButton="Send"
      size="large"
      style={{ backgroundColor: "red" }}
      onSearch={value => console.log(value)}
    />
  </div>
  );
}