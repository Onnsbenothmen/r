import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom'; // Importez useHistory
import { Layout, Menu, Button } from 'antd'; // Ajout de Button
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Profile from './Profil';
import './Dashboard.css'; // Importez le fichier CSS pour les styles du tableau de bord

const { Header, Content, Sider } = Layout;

const DashboardPr = () => {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const history = useHistory(); // Utilisez useHistory
    const { email, firstName, lastName, role } = location.search ? Object.fromEntries(new URLSearchParams(location.search)) : {};

    useEffect(() => {
        if (email && firstName && lastName && role) {
            setUserData({
                email: decodeURIComponent(email),
                firstName: decodeURIComponent(firstName),
                lastName: decodeURIComponent(lastName),
                role: decodeURIComponent(role)
            });
        }
    }, [email, firstName, lastName, role]);

    const handleLogout = () => {
        console.log('Logging out...');
    };
    const handleInstanceSign = () => {
        history.push('/SignupAdmin'); // Utilisez history.push pour naviguer vers '/SignupAmin'
    };
    const handleInstancelist = () => {
        history.push('/ListAdmin'); // Utilisez history.push pour naviguer vers '/SignupAmin'
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ backgroundColor: '#001529' }}>
                <div className="logo" style={{ height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '16px' }} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2" className="about-me-item">
                        <Link to="/profile">About Me</Link>
                        <div className="about-me-options">
                            <p>Edit Profile</p>
                            <p>Privacy Settings</p>
                            <p>Account Settings</p>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#fff' }} />
                <Content style={{ margin: '16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {userData && <Profile userData={userData} />}
                    </div>
                </Content>
                <Button type="primary" onClick={handleInstanceSign} style={{ marginRight: '10px' }}>Ajouter un admin</Button>
                <Button type="primary" onClick={handleInstancelist} style={{ marginRight: '10px' }}>la liste des admin</Button>

            </Layout>
            <LogoutOutlined onClick={handleLogout} style={{ color: '#fff', fontSize: '24px', margin: '16px' }} />
        </Layout>
    );
};

export default DashboardPr;
