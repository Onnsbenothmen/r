import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const SignUp = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Récupération des rôles depuis l'API Flask lors du chargement du composant
    axios.get('http://localhost:5000/roles')
      .then(response => {
        setRoles(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des rôles:', error);
        message.error('Erreur lors de la récupération des rôles');
      });
  }, []);

  const handleSignUp = async (values) => {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('role', values.role);
      formData.append('profile_image', avatar);

      // Envoi de la requête POST vers l'API Flask pour l'inscription avec l'image de profil
      const response = await axios.post('http://localhost:5000/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Affichage d'un message de succès
      message.success(response.data.message);

      // Réinitialisation du formulaire après soumission réussie
      form.resetFields();
      setAvatar(null); // Réinitialiser l'état de l'image de profil
    } catch (error) {
      // Affichage d'un message d'erreur en cas d'échec de la requête
      message.error(error.response ? error.response.data.error : 'Erreur inconnue');
    }
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <h2>Inscription</h2>
      <Form form={form} onFinish={handleSignUp} layout="vertical">
        <Form.Item
          label="Prénom"
          name="firstName"
          rules={[{ required: true, message: 'Veuillez saisir votre prénom' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nom de famille"
          name="lastName"
          rules={[{ required: true, message: 'Veuillez saisir votre nom de famille' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Veuillez saisir votre email' }, { type: 'email', message: 'Adresse email invalide' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: 'Veuillez saisir votre mot de passe' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Rôle"
          name="role"
          rules={[{ required: true, message: 'Veuillez sélectionner un rôle' }]}
        >
          <Select placeholder="Sélectionnez un rôle">
            {roles.map(role => (
              <Option key={role.id} value={role.name}>{role.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Image de profil"
          name="profile_image"
          valuePropName="fileList"
          getValueFromEvent={e => e.fileList}
        >
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            S'inscrire
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
