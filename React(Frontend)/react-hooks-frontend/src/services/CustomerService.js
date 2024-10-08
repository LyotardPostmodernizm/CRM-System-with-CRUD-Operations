import axios from 'axios';

const CUSTOMER_BASE_REST_API_URL = 'http://localhost:8080/api/customers';

// Axios interceptors ile her isteğe otomatik olarak token ekliyoruz


class CustomerService {

  // Tüm müşterileri getir

  getAllCustomers() {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return axios.get(CUSTOMER_BASE_REST_API_URL, {
      headers: {
        Authorization: `Bearer ${token}` // JWT token'ı Authorization başlığına ekle
      }
    });
  }

  // Create new customer with token
  createCustomer(customer) {
    const token = localStorage.getItem("token");
    return axios.post(CUSTOMER_BASE_REST_API_URL, customer, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Update existing customer with token
  updateCustomer = (id, customerData) => {
    return axios.put(`${CUSTOMER_BASE_REST_API_URL}/${id}`, customerData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` // Token'ı burada gönderin
      }
    });
  };

  // Get customer by ID
  getCustomerById(customerId) {
    const token = localStorage.getItem("token");
    return axios.get(`${CUSTOMER_BASE_REST_API_URL}/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  // Müşteriyi sil
  deleteCustomer(customerId) {
    const token = localStorage.getItem("token");
    return axios.delete(`${CUSTOMER_BASE_REST_API_URL}/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  filterCustomersByRegion(region) {
    const token = localStorage.getItem("token");
    return axios.get(`${CUSTOMER_BASE_REST_API_URL}/filter?region=${region}`, {
      headers: {
        Authorization: `Bearer ${token}` // JWT token'ı Authorization başlığına ekle
      }
    });
  }
}


export default new CustomerService();
