import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { Form, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Profil.css'; // Importer le fichier CSS pour les styles

const Profile = () => {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null); // State pour stocker l'image sélectionnée

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Logique pour sauvegarder les modifications du profil
    setEditing(false);
  };

  const handleImageChange = (event) => {
    // Récupérer l'image sélectionnée
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className='profile-container'>
      {user ? (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card profile-card'>
                <div className='card-body'>
                  <div className='text-center mb-4'>
                    <Avatar size={128} icon={<UserOutlined />} className='profile-avatar' />
                  </div>
                  <div className='text-center'>
                    {/* Afficher l'image sélectionnée */}
                    {image && <img src={URL.createObjectURL(image)} alt='profile' className='profile-image' />}
                    {/* Input pour sélectionner une image */}
                    <input type='file' accept='image/*' onChange={handleImageChange} className='profile-image-input' />
                  </div>
                  <h3 className='card-title text-center'>Profil de l'utilisateur</h3>
                  {!editing ? (
                    <>
                      <p>Email: {user.email}</p>
                      <p>Nom: {user.firstName} {user.lastName}</p>
                      <p>Rôle: {user.role}</p>
                      <div className='text-center'>
                        <Button type='primary' onClick={handleEdit}>Modifier le Profil</Button>
                      </div>
                    </>
                  ) : (
                    <Form onFinish={handleSave} layout='vertical'>
                      <Form.Item label='Email' name='email'>
                        <Input defaultValue={user.email} disabled />
                      </Form.Item>
                      <Form.Item label='Prénom' name='firstName'>
                        <Input defaultValue={user.firstName} />
                      </Form.Item>
                      <Form.Item label='Nom' name='lastName'>
                        <Input defaultValue={user.lastName} />
                      </Form.Item>
                      <div className='text-center'>
                        <Button type='primary' htmlType='submit'>Sauvegarder</Button>
                      </div>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Profile;
