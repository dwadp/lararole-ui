import { useContext } from 'react';
import { Layout } from 'antd';

import Sidebar from '../../components/Sidebar';

import { AuthContext } from '../../context/auth/AuthContext';

const { Content, Sider } = Layout;

const Dashboard = ({ children }) => {
  const {
    logout,
  } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0' }}>
          <Sider width={200}>
            <Sidebar logout={handleLogout} />
          </Sider>
          {children}
        </Layout>
      </Content>
    </Layout>
  );
}

export default Dashboard;