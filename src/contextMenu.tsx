import React, { useCallback, useState } from "react";
import { Dropdown, Menu } from "antd";
import 'antd/dist/antd.css'


export const ContextMenu = (() => {
  console.log('context')
  const [flag, setFlag] = useState(0);
  return (
    <Menu>
      <Menu.Item key='1' onClick={() => setFlag(flag + 1)}>itme1</Menu.Item>
      <Menu.Item key='2'>itsm</Menu.Item>
    </Menu>
  );
})

// const test = () => {
//   <ContextMenu />
// }

const Drop: React.FC = React.memo(({children}) => {
  console.log('drop')
  return (
    <Dropdown trigger={['contextMenu']} overlay={ContextMenu()}>
      {children}
    </Dropdown>
  )
})

export default Drop;