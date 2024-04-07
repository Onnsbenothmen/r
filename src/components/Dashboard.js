// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import InstanceList from '../Instance/InstanceList';
import RolesList from './Role/roleList';
import axios from 'axios';
import { Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const history = useHistory();
  const [userRole, setUserRole] = useState(null); 

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('URL_VERS_VOTRE_ENDPOINT_POUR_OBTENIR_LE_ROLE');
        setUserRole(response.data.role); 
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
      }
    };

    fetchUserRole(); 
  }, []);

  useEffect(() => {
    if (userRole === 'président') {
      history.push('/dashboardpr');
    }
  }, [userRole, history]);

  const handleLogin = () => {
    history.push('/login');
  };

  const handleInstanceForm = () => {
    history.push('/InstanceCreate');
  };

  const handleRolesList = () => {
    history.push('/RolesList');
  };
  const handleListUser = () => {
    history.push('/UserList');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark" style={{ background: '#001529', color: '#fff' }}>
        <div style={{ textAlign: 'center', fontSize: '1.5em', color: '#fff', padding: '20px 0' }}>Nom de l'Application</div>
        <Layout.Sider theme="dark" width={200} collapsible>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} style={{ background: '#001529', color: '#fff' }}>
            <Menu.Item key="1" icon={<DashboardOutlined />} style={{ color: '#fff' }}>Gestion des Instances</Menu.Item>
          </Menu>
        </Layout.Sider>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
          <div style={{ flex: '1' }}>
            <Button type="primary" onClick={handleInstanceForm} style={{ marginRight: '10px' }}>Créer une Instance</Button>
            <Button type="primary" onClick={handleRolesList} style={{ marginRight: '10px' }}>Liste des Rôles</Button>
            <Button type="primary" onClick={handleListUser} style={{ marginRight: '10px' }}>Liste des users</Button>

          </div>
          <Button type="primary" onClick={handleLogin}>Connexion</Button>
        </Header>
        <Content style={{ margin: '16px', background: '#fff', minHeight: '360px', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0, 21, 41, 0.08)' }}>
          <InstanceList />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
