import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.png';
import logoText from '@/style/images/logo-text.png';
import history from '@/utils/history';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  UserAddOutlined,
  FileOutlined,
} from '@ant-design/icons';

const SIDEBAR_MENU_REL = [
  { key: '/', icon: <DashboardOutlined />, title: 'Dashboard' },
];

const SIDEBAR_MENU_IRREL = [

  { key: '/lead', icon: <UserAddOutlined />, title: 'Lead' },
  { key: '/admin', icon: <UserOutlined />, title: 'Admin' },
  
];

const PERSONAS_SUBMENU = [
  { key: '/employee', icon: <TeamOutlined />, title: 'Employee' },
  { key: '/customer', icon: <CustomerServiceOutlined />, title: 'Customer' },
  { key: '/supplier', icon: <UserAddOutlined />, title: 'Supplier' },
  { key: '/branch', icon: <UserAddOutlined />, title: 'Branches' },
  { key: '/company', icon: <UserAddOutlined />, title: 'Companies' },
];

const QUOTES_SUBMENU = [
  { key: '/invoice', icon: <FileTextOutlined />, title: 'Invoice' },
  { key: '/quote', icon: <FileSyncOutlined />, title: 'Quote' },
];

const PURCHASE_SUBMENU = [
  { key: '/offer', icon: <FileOutlined />, title: 'Offer' },
  { key: '/payment/invoice', icon: <CreditCardOutlined />, title: 'Payment Invoice' },
];

const SETTINGS_SUBMENU = [
  { key: '/settings', title: 'General Settings' },

  { key: '/email', title: 'Email templates' },

  { key: '/payment/mode', title: 'Payment Mode' },
  { key: '/settings/advanced', title: 'Advanced Settings' },
];

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider
        collapsible={collapsible}
        collapsed={collapsible ? isNavMenuClose : collapsible}
        onCollapse={onCollapse}
        className="navigation"
      >
        <div className="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          <img src={logoIcon} alt="Logo" style={{ height: '32px' }} />

          {!showLogoApp && (
            <img
              src={logoText}
              alt="Logo"
              style={{ marginTop: '3px', marginLeft: '10px', height: '29px' }}
            />
          )}
        </div>
        <Menu mode="inline" selectedKeys={[currentPath]}>
          {SIDEBAR_MENU_REL.map((menuItem) => (
            <Menu.Item key={menuItem.key} icon={menuItem.icon}>
              <Link to={menuItem.key} />
              {menuItem.title}
            </Menu.Item>
          ))}
          <SubMenu key={'Personas'} icon={<UserOutlined />} title={'People'}>
            {PERSONAS_SUBMENU.map((menuItem) => (
              <Menu.Item key={menuItem.key}>
                <Link to={menuItem.key} />
                {menuItem.title}
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key={'Cotizaciones'} icon={<FileTextOutlined />} title={'Quotes'}>
            {QUOTES_SUBMENU.map((menuItem) => (
              <Menu.Item key={menuItem.key}>
                <Link to={menuItem.key} />
                {menuItem.title}
              </Menu.Item>
            ))}
          </SubMenu>
          <SubMenu key={'OrdenCompra'} icon={<CreditCardOutlined />} title={'Purchase'}>
            {PURCHASE_SUBMENU.map((menuItem) => (
              <Menu.Item key={menuItem.key}>
                <Link to={menuItem.key} />
                {menuItem.title}
              </Menu.Item>
            ))}
          </SubMenu>
          
          {SIDEBAR_MENU_IRREL.map((menuItem) => (
            <Menu.Item key={menuItem.key} icon={menuItem.icon}>
              <Link to={menuItem.key} />
              {menuItem.title}
            </Menu.Item>
          ))}
          <SubMenu key={'Settings'} icon={<SettingOutlined />} title={'Settings'}>
            {SETTINGS_SUBMENU.map((menuItem) => (
              <Menu.Item key={menuItem.key}>
                <Link to={menuItem.key} />
                {menuItem.title}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="text" size="large" onClick={showDrawer} className="mobile-sidebar-btn">
        <MenuOutlined />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
