import { Menu } from 'antd';

function MainMenu() {
  return (
    <div class="mainMenu">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Other Page</Menu.Item>
        </Menu>
    </div>
  );
}

export default MainMenu;
