package com.devo_bhai.Microservices.service;

import com.devo_bhai.Microservices.entity.Employee;
//import com.devo_bhai.Microservices.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {

//    private final EmployeeRepository employeeRepository;
//
//    public EmployeeService(EmployeeRepository employeeRepository) {
//        this.employeeRepository = employeeRepository;
//    }
//
//    public ResponseEntity<List<Employee>> fetchAllEmployees(){
//        return ResponseEntity.ok(employeeRepository.findAll());
//    }
//
//    public ResponseEntity<Optional<Employee>> fetchEmployeeById(Long id){
//        Optional<Employee> employee = employeeRepository.findById(id);
//        if(employee.isPresent()){
//            return ResponseEntity.ok(employee);
//        }
//        return ResponseEntity.notFound().build();
//    }
}
