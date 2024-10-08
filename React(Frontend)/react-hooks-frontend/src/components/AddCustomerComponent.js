import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import authService from '../services/AuthService'; 
import '../App.css';

const AddCustomerComponent = () => {  //Formda doldurulan müşteri bilgilerini saklayan state'ler.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [userRole, setUserRole] = useState(null);  // Kullanıcı rolünü kontrol etmek için state
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const role = authService.getCurrentUserRole();
        setUserRole(role);  // Rolü state'e kaydediyoruz

        if (id) {
            CustomerService.getCustomerById(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setRegion(response.data.region);
                setRegistrationDate(response.data.registrationDate);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    const saveOrUpdateCustomer = (e) => {
        e.preventDefault();

        const customer = { firstName, lastName, email, region, registrationDate };

        if (id) {
            CustomerService.updateCustomer(id, customer).then((response) => {
                navigate('/customers');
            }).catch(error => {
                console.log(error);
            });
        } else {
            CustomerService.createCustomer(customer).then((response) => {
                navigate('/customers');
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const title = () => {
        return id ? <h2 className="text-center">Update Customer</h2> : <h2 className="text-center">Add Customer</h2>;
    };

    return (
        <div className="container mt-5">
            {userRole === 'admin' ? (  // Sadece admin ise formu göster
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card shadow-lg p-4">
                            {title()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Region</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter region"
                                            value={region}
                                            onChange={(e) => setRegion(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Registration Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={registrationDate}
                                            onChange={(e) => setRegistrationDate(e.target.value)}
                                        />
                                    </div>

                                    <button className="btn btn-primary" onClick={saveOrUpdateCustomer}>
                                        Submit
                                    </button>
                                    <Link to="/customers" className="btn btn-secondary ml-2">
                                        Cancel
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-danger">You do not have permission to add customers.</div>
            )}
        </div>
    );
};

export default AddCustomerComponent;