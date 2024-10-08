import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import AuthService from '../services/AuthService';

const ListCustomerComponent = () => {
  const [customers, setCustomers] = useState([]); // Müşteri verilerini tutacak state
  const [error, setError] = useState(null); // Hata durumunu takip etmek için
  const [filterRegion, setFilterRegion] = useState(''); // Filtreleme için region state
  const navigate = useNavigate(); // Yönlendirme için navigate hooku kullanıyoruz

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = () => {
    CustomerService.getAllCustomers().then((response) => {
      setCustomers(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  // Müşteri filtreleme fonksiyonu
  const filterCustomers = () => {
    if (filterRegion) {
      CustomerService.getAllCustomers().then((response) => {
        const filteredCustomers = response.data.filter(customer => customer.region === filterRegion);
        setCustomers(filteredCustomers);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      getAllCustomers(); // Eğer input boşsa tüm müşterileri göster
    }
  };

  // Logout fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem("user"); // localStorage'dan token'ı kaldırıyoruz
    navigate("/login"); // Login sayfasına yönlendiriyoruz
  };

  const handleBackButton = () => {
    navigate('/user-profile'); // Geri düğmesine basıldığında kullanıcı profil sayfasına yönlendiriyoruz
  };

  // Müşteri güncelleme fonksiyonu
  const handleUpdateCustomer = (customerId) => {
    navigate(`/customers/${customerId}`); // Müşteri güncelleme sayfasına yönlendiriyoruz.
  };

  // Müşteri silme fonksiyonu
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Bu müşteriyi silmek istediğinize emin misiniz?")) {
      CustomerService.deleteCustomer(customerId)
        .then(() => {
          getAllCustomers(); // Müşteri listesini güncelle
        })
        .catch((error) => {
          console.error("Müşteri silinirken hata oluştu:", error);
          setError("Müşteri silinirken bir hata oluştu.");
        });
    }
  };

  // Kullanıcıları listeleme butonuna basıldığında yönlendirme
  const handleListUsers = () => {
    navigate('/list-users'); // Kullanıcıları listeleme sayfasına yönlendir
  };

  return (
    <div className="container">
      <h2 className="text-center">List Customers</h2>

      <button className="btn btn-danger mb-2" onClick={handleLogout}>Logout</button>
      <button className="btn btn-secondary mb-2" onClick={handleBackButton}>Back to Profile</button>

      {AuthService.isAdmin() && (
        <>
          <Link to="/add-customer" className="btn btn-primary mb-2">Add Customer</Link>
          <button className="btn btn-info mb-2" onClick={handleListUsers}>Kullanıcıları Gör</button>
        </>
      )}

   
      <div className="mb-2">
        <input 
          type="text" 
          placeholder="Filter by Region" 
          value={filterRegion} 
          onChange={(e) => setFilterRegion(e.target.value)} 
          className="form-control" 
        />
        <button className="btn btn-success mt-2" onClick={filterCustomers}>Filter Customers</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Registration Date</th>
            {AuthService.isAdmin() && (
              <>
                <th>Update</th>
                <th>Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.region}</td>
                <td>{customer.registrationDate}</td>
                {AuthService.isAdmin() && (
                  <>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleUpdateCustomer(customer.id)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteCustomer(customer.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCustomerComponent;
