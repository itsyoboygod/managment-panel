import React, { useEffect, useState } from 'react';
import '../components/styles/users.css';
import '../components/styles/modal.css';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [role, setRole] = useState('user');

  // Open delete modal and set the selected user
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Open edit modal and set the selected user
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Close modals
  const closeModal = () => {
    setDeleteModalOpen(false);
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  // Handle user deletion (inside the modal)
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User deleted successfully');
        setData(data.filter(user => user.id !== selectedUser.id)); // Update the state to remove the deleted user
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      closeModal();
    }
  };

  // Handle user edit (inside the modal)
  const handleEdit = async () => {
    const updatedUser = {
      username: document.getElementById('edit-username').value, // Assuming you have an input field for this
      email: document.getElementById('edit-email').value,
      role: role,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        console.log('User updated successfully');
        // Update the state with the modified user
        setData(data.map(user => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)));
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Registered Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="config-button" id='edit-btn' onClick={() => handleEditClick(user)}>✎</button>
              </td>
              <td>
                <button className="config-button" id='del-btn' onClick={() => handleDeleteClick(user)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete {selectedUser.username}?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button className="close-button" onClick={closeModal}>×</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <label>
              Username:
              <input type="text" id="edit-username" defaultValue={selectedUser.username} />
            </label>
            <label>
              Email:
              <input type="email" id="edit-email" defaultValue={selectedUser.email} />
            </label>
            <label>
              Role:
              {/* Radio Buttons for Role Selection */}
              <div className="role-selection">
                <label>
                  <input
                    type="radio"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={e => setRole(e.target.value)}
                  />
                  Admin
                </label>
                <label>
                  <input
                    type="radio"
                    value="user"
                    checked={role === 'user'}
                    onChange={e => setRole(e.target.value)}
                  />
                  User
                </label>
              </div>
            </label>
            <button onClick={handleEdit}>Save Changes</button>
            <button className="close-button" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;