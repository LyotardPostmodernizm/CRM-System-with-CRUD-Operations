import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';  

const SignUpComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
      role: 'user', // Set role to 'user'
    };
    
    try {
      await AuthService.signUp(user);
      alert("Kayıt başarılı!"); // Başarılı kayıt bildirim mesajı

      // Kullanıcı 'Tamam' butonuna bastığında yönlendirme
      setTimeout(() => {
        window.location.href = "/login"; // Login sayfasına yönlendirme
      }, 2000); // 2 saniye sonra yönlendirme
    } catch (error) {
      console.error("Signup error:", error);
      alert("Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}


export default SignUpComponent;
