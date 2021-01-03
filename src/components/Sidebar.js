import { useAbility } from '@casl/react';
import { Menu } from 'antd';
import {
  TeamOutlined,
  SafetyCertificateOutlined,
  UnlockOutlined,
  PoweroffOutlined,
  HomeFilled,
  ReadFilled
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { AbilityContext } from '../context/ability/AbilityContext';

const { SubMenu } = Menu;

const Sidebar = ({ logout }) => {
  const ability = useAbility(AbilityContext);

  return (
    <Menu
      mode="inline"
      style={{ height: '100%' }}
    >
      <Menu.Item key="dashboard" icon={<HomeFilled />}>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </Menu.Item>
      {ability.can('all', 'users') || ability.can('create', 'user') ? (
        <SubMenu key="users" icon={<TeamOutlined />} title="Users">
        {
          ability.can('all', 'users') &&
          <Menu.Item key="all">All</Menu.Item>
        }
        {
          ability.can('create', 'user') &&
          <Menu.Item key="create">Create</Menu.Item>
        }
      </SubMenu>
      ) : null}
      
      {
        ability.can('all', 'roles') &&
        <Menu.Item key="roles" icon={<SafetyCertificateOutlined />}>
          Roles
        </Menu.Item>
      }
      {
        ability.can('all', 'roles') &&
        <Menu.Item key="permissions" icon={<UnlockOutlined />}>
          Permissions
        </Menu.Item>
      }
      {
        ability.can('all', 'posts') &&
        <Menu.Item key="posts" icon={<ReadFilled />}>
          <Link to="/dashboard/posts">
            Posts
          </Link>
        </Menu.Item>
      }
      <Menu.Item onClick={logout} key="logout" icon={<PoweroffOutlined />}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
}

export default Sidebar;