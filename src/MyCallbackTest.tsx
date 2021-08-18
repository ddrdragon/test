import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Menu } from 'antd';

interface ChildProps {
  a?: number;
  b?: number[];
  func?: () => number;
};

const Test = () => {

  return (
      <div style={{border: 'solid red 2px', height: "200px"}}>
        
      </div>
  );
};

const Child = React.memo(({ }: ChildProps) => {
  console.log("Child rendered");
  return <div></div>;
});











export default Test;
