import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // jwt-decode'i default olarak import edin.

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    // Token'ı localStorage'dan alın
    getJwtToken = () => {
        return localStorage.getItem('token'); 
    };

    // Register (Sign Up) a new user
    async signUp(user) {
        console.log('Sending signup request:', user);
        return await axios.post(API_URL + "signup", {
            username: user.username,
            password: user.password,
            role: "user"
        }).catch(error => {
            console.error('Signup error:', error.response);
            throw error;
        });
    }

    // Login user
    async login(user) {
        try {
            const response = await axios.post(API_URL + "login", {
                username: user.username,
                password: user.password,
            });

            console.log("Response from login:", response.data);

            if (response.data.accessToken) {
                // Backend'den gelen verileri kaydediyoruz
                localStorage.setItem("user", JSON.stringify({
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt,
                }));
                localStorage.setItem("token", response.data.accessToken); // Token'ı kaydediyoruz
            } else {
                console.error('No access token in response:', response);
            }

            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

 
    getCurrentUserRole = () => {
        const token = this.getJwtToken(); // JWT token'ı alıyoruz
        if (!token) return null;

        // JWT'yi decode edin
        const decodedToken = jwtDecode(token); 
        return decodedToken.role; 
    };

   
    logout() {
        localStorage.removeItem("user"); // Kullanıcı bilgilerini sil
        localStorage.removeItem("token"); // Token'ı da sil
        window.location.href = '/login'; // Login sayfasına yönlendir
    }

    // Get the currently logged in user from local storage
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    // Check if the current user is admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
}

export default new AuthService();
