package com.crmSystemDevelopment.spring_boot.controller;
import com.crmSystemDevelopment.spring_boot.exception.ResourceNotFoundException;
import com.crmSystemDevelopment.spring_boot.model.Customer;
import com.crmSystemDevelopment.spring_boot.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;


@RestController // sınıfın bir restful web servisi olduğunu belirtir
@RequestMapping("/api/customers") //Tüm müşteri işlemleri için temel URL yolu
public class CustomerController {
    private CustomerController customerService;
    @Autowired
    private CustomerRepository customerRepository;  //Spring'in dependency injection ile otomatik olarak atadığı müşteri veri erişim nesnesi

    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    } //Veritabanındaki tüm müşterileri döndüren bir GET API


    //Post is for creating the resource, Put is for updating the resource


    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {  //JSON tipi Customer
        return customerRepository.save(customer);
    } //Yeni bir müşteri oluşturmak için POST isteği yapıldığında çalışır.
    //@RequestBody kullanarak, JSON formatındaki müşteri bilgilerini alır ve veritabanına kaydeder.


    //get customer by id REST API
    @GetMapping("{id}")  //id dinamiktir
    public ResponseEntity<Customer> getCustomerById(@PathVariable  long id){ //URL'deki dinamik id değişkenini alıyoruz.
        Customer customer = customerRepository.findById(id)     //It produces Optional class - supplier functional interface
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found  with this id:" + id));
        return ResponseEntity.ok(customer);
    } //Belirli bir müşteri ID'si ile o müşteriyi getiren bir GET API. Müşteri bulunamazsa exception fırlatıyoruz.






    @PutMapping("{id}") //Verilen müşteri ID'si ile mevcut müşteriyi güncelleyen PUT API.
    //Json tipinde gelen müşteri bilgileriyle veritabanındaki müşteri güncellenir.
    public ResponseEntity<Customer> updateCustomer(@PathVariable long id,@RequestBody Customer customerDetails) {
        Customer updateCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found  with this id: " + id));

        updateCustomer.setFirstName(customerDetails.getFirstName());
        updateCustomer.setLastName(customerDetails.getLastName());
        updateCustomer.setEmail(customerDetails.getEmail());
        updateCustomer.setRegion(customerDetails.getRegion());
        updateCustomer.setRegistrationDate(customerDetails.getRegistrationDate());

        customerRepository.save(updateCustomer);

        return ResponseEntity.ok(updateCustomer);
    }



    @DeleteMapping("{id}") //Belirtilen ID ile müşteriyi silen bir DELETE API
    public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable long id){

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found  with this id: " + id));

        customerRepository.delete(customer);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @GetMapping("/filter")  //@RequestParam kullanarak URL'den bölge bilgisini alıyoruz
    public List<Customer> filterCustomersByRegion(@RequestParam String region) {

        return customerService.filterCustomersByRegion(region); // Bölgeye göre filtrele
    }
}