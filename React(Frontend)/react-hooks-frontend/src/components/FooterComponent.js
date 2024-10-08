import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="bg-dark text-white text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        
                        <p>
                            Developed by M. Onur Aysel
                        </p>
                    </div>

                   
                    
                    
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contact</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-telephone"></i> mehmet_onur383@hotmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>

            
            <div className="text-center p-3 bg-primary">
                © {new Date().getFullYear()} Jekirdek Technology | All Rights Reserved
            </div>
        </footer>
    );
};

export default FooterComponent;
