import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import AuthService from '../services/AuthService';

const UpdateCustomerComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [error, setError] = useState(null); // Hata durumu için state ekledik
  const { id } = useParams(); // Parametreleri almak için kullanıyoruz
  const navigate = useNavigate();
  

  useEffect(() => {
    // Müşteri verilerini almak için API çağrısı
    CustomerService.getCustomerById(id).then(response => {
      const customer = response.data;
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setRegion(customer.region);
      setRegistrationDate(customer.registrationDate);
    }).catch(error => {
      console.error("Error fetching customer:", error);
      setError("Müşteri bilgileri alınırken bir hata oluştu."); // Hata durumu
    });
  }, [id]);

  const handleUpdateCustomer = async (e) => {
    e.preventDefault(); // Formun varsayılan gönderimini engelliyoruz

    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login'); // Giriş yapılmadıysa login sayfasına yönlendir
      return;
    }

    // Güncellenecek müşteri verilerini oluştur
    const updatedCustomerData = {
      firstName,
      lastName,
      email,
      region,
      registrationDate
    };

    try {
      // Customer güncelleme işlemi
      const response = await CustomerService.updateCustomer(id, updatedCustomerData);
      console.log("Customer updated successfully:", response.data);
      
      // 2 saniye bekledikten sonra müşteriler sayfasına yönlendiriyoruz
      setTimeout(() => {
        navigate('/customers'); // Güncellemeyi başarıyla yaptıktan sonra müşteriler listesine dönüyoruz
      }, 2000);
      
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Müşteri güncellenirken bir hata oluştu."); // Hata durumu
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Update Customer</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Hata mesajını gösteriyoruz */}
      <form onSubmit={handleUpdateCustomer}>
        <div className="form-group mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Region</label>
          <input
            type="text"
            className="form-control"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Registration Date</label>
          <input
            type="date"
            className="form-control"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Customer</button>
        <button className="btn btn-secondary ml-2" onClick={() => navigate('/customers')}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCustomerComponent;
