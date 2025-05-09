import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function LoginForm({ toggleTheme }) {
  const [passwordType, setPasswordType] = useState('password');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: username.value,
        password: password.value,
      });
      setAlert({
        show: true,
        variant: 'success',
        message: 'Login successful!',
      });
      console.log('Login Success:', response.data);
      // เก็บ token หรือ redirect ตามต้องการ
      setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 5000);
    } catch (error) {
      setAlert({
        show: true,
        variant: 'danger',
        message: error.response?.data?.error || 'Login failed. Please try again.',
      });
      console.error('Login Error:', error.response?.data || error.message);
      setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 5000);
    }
  };

  return (
    <Form className="sign-in-form" onSubmit={handleSubmit}>
      {alert.show && (
        <Alert variant={alert.variant} className="d-flex align-items-center">
          <i
            className={`fas ${alert.variant === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}
          ></i>
          {alert.message}
        </Alert>
      )}
      <h2 className="title">Login</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <Form.Control
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Username"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <Form.Control
          type={passwordType}
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          required
        />
        <i
          className={`far ${passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}
          onClick={togglePassword}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>
      <Button type="submit" className="btn solid">
        Sign in
      </Button>
      <div className="social-media">
        <a className="icon-mode" onClick={() => toggleTheme('dark')}>
          <i className="fas fa-moon"></i>
        </a>
        <a className="icon-mode" onClick={() => toggleTheme('light')}>
          <i className="fas fa-sun"></i>
        </a>
      </div>
      <p className="text-mode">Change theme</p>
    </Form>
  );
}

export default LoginForm;