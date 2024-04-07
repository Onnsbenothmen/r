import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UpdateUser.css'; // Import CSS for styling

const UpdateUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role_name: '', // Assurez-vous de définir role_name comme un champ dans l'état local du composant
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = history.location.state?.user;
      if (userData) {
        setUser(userData);
      } else {
        const userResponse = await fetch(`http://127.0.0.1:5000/users/${id}`);
        const userData = await userResponse.json();
        setUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role_name: userData.role_name, // Utilisez role_name ici
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();

    // Fetch roles
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/roles');
        const data = await response.json();
        setRoles(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    fetchRoles();
  }, [id, history]);

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:5000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role_name: user.role_name, // Assurez-vous que le champ de rôle est correctement transmis
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error:', error));
  };

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role_name">Role:</label>
            <select
              id="role_name"
              name="role_name"
              value={user.role_name}
              onChange={handleChange}
            >
              {roles.map(role => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              handleUpdate();
              history.push('/UserList');
            }}
          >
            Update User
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
