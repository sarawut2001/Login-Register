import { useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function RegisterForm({ toggleMode }) {
  const [passwordType, setPasswordType] = useState('password');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const formRef = useRef(null);

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target.elements;
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      setAlert({
        show: true,
        variant: 'success',
        message: 'Registration successful! Redirecting to Login...',
      });
      console.log('Register Success:', response.data);
      // เคลียร์ฟอร์ม
      formRef.current.reset();
      // สลับไปฟอร์ม Login หลังจาก 2 วินาที
      setTimeout(() => {
        setAlert({ show: false, variant: '', message: '' });
        toggleMode();
      }, 2000);
    } catch (error) {
      setAlert({
        show: true,
        variant: 'danger',
        message: error.response?.data?.error || 'Registration failed. Please try again.',
      });
      console.error('Register Error:', error.response?.data || error.message);
      setTimeout(() => setAlert({ show: false, variant: '', message: '' }), 5000);
    }
  };

  return (
    <Form className="sign-up-form" onSubmit={handleSubmit} ref={formRef}>
      {alert.show && (
        <Alert variant={alert.variant} className="d-flex align-items-center">
          <i
            className={`fas ${alert.variant === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}
          ></i>
          {alert.message}
        </Alert>
      )}
      <h2 className="title">Register</h2>
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
        <i className="fas fa-envelope"></i>
        <Form.Control
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <Form.Control
          type={passwordType}
          name="password"
          autoComplete="new-password"
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
        Create account
      </Button>
    </Form>
  );
}

export default RegisterForm;