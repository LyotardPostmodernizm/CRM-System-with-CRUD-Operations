import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

// Axios interceptors ile her isteğe otomatik olarak token ekliyoruz


class UserService {

  // Tüm kullanıcıları getir
  getAllUsers() {
    const token = localStorage.getItem("token");
    return axios.get(USER_API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}` // JWT token'ı Authorization başlığına ekle
      }
    });
  }

  // Kullanıcıyı güncelle
  updateUser(userId, user) {
    const token = localStorage.getItem("token");
    return axios.put(`${USER_API_BASE_URL}/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // ID ile kullanıcıyı getir
  getUserById(userId) {
    const token = localStorage.getItem("token");
    return axios.get(`${USER_API_BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Kullanıcıyı sil
  deleteUser(userId) {
    const token = localStorage.getItem("token");
    return axios.delete(`${USER_API_BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export default new UserService();
