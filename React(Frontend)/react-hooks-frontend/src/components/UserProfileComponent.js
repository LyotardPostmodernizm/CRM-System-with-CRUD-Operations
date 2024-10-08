import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const UserProfileComponent = () => {
  const userFromStorage = JSON.parse(localStorage.getItem("user")); // LocalStorage'dan kullanıcı bilgilerini al
  const [user, setUser] = useState(userFromStorage || {}); // State'de kullanıcı bilgilerini tut
  const [password, setPassword] = useState(''); // Parola için ayrı state tutuyoruz
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Eğer parola güncellendiyse, user objesine ekle
    const updatedUser = { ...user };
    if (password) {
      updatedUser.password = password; // Parola state'i doluysa kullanıcı objesine ekliyoruz
    }

    UserService.updateUser(user.id, updatedUser) // Kullanıcı bilgilerini güncelleme isteği
      .then((response) => {
        console.log("Kullanıcı başarıyla güncellendi:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Güncellenen kullanıcı verisini localStorage'da güncelle
        navigate('/user-profile'); // Profili tekrar yükle
      })
      .catch((error) => {
        console.error("Kullanıcı güncellenirken hata oluştu:", error);
      });
  };

  if (!user) {
    return <div className="alert alert-danger">Kullanıcı bilgileri bulunamadı.</div>; // Eğer kullanıcı yoksa hata mesajı göster
  }

  return (
    <div className="container">
      <h2 className="text-center">Kullanıcı Profili</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" className="form-control" value={user.id} disabled />
        </div>
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Parola:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handlePasswordChange} // Parola alanı için ayrı bir handle fonksiyonu kullanıyoruz
            placeholder="Parolanızı güncellemek için buraya yazın"
          />
        </div>
        <div className="form-group">
          <label>Rol:</label>
          <input type="text" className="form-control" value={user.role} disabled />
        </div>
        <div className="form-group">
          <label>Oluşturulma Tarihi:</label>
          <input type="text" className="form-control" value={user.createdAt} disabled />
        </div>
        <div className="form-group">
          <label>Güncellenme Tarihi:</label>
          <input type="text" className="form-control" value={user.updatedAt} disabled />
        </div>
        <button type="submit" className="btn btn-primary">Bilgileri Güncelle</button>
      </form>
    </div>
  );
};

export default UserProfileComponent;
