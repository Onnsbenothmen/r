import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table, Typography, Modal, Avatar } from 'antd'; // Importez Avatar depuis Ant Design
import axios from 'axios';

const { Text } = Typography;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:5000/users')
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (userId) => {
    setDeleteModalVisible(true);
    setSelectedUserId(userId);
  };

  const confirmDelete = () => {
    axios.delete(`http://127.0.0.1:5000/users/${selectedUserId}`)
      .then(response => {
        console.log(response.data.message);
        setUsers(users.filter(user => user.id !== selectedUserId));
        setDeleteModalVisible(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setDeleteModalVisible(false);
      });
  };

  const handleUpdate = (user) => {
    history.push(`/update/${user.id}`, { user });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Profile Image',
      dataIndex: 'profile_image', // Assurez-vous que votre API renvoie un champ profile_image pour chaque utilisateur
      key: 'profile_image',
      render: (text, user) => (
        <Avatar src={`http://127.0.0.1:5000/static/uploads/${text}`} size={64} /> // Utilisez Avatar avec le chemin de l'image
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, user) => (
        <span>
          <Button type="primary" onClick={() => handleUpdate(user)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 5,
    showSizeChanger: false,
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      <Table dataSource={users} columns={columns} rowKey="id" pagination={paginationConfig} loading={loading} />

      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserList;
