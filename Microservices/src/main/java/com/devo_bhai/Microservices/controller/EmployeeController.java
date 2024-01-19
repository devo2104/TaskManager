package com.devo_bhai.Microservices.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class EmployeeController {

    @GetMapping("/emp")
    public String getAllEmployees(){
        return "HI";
    }

}
