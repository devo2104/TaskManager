package com.devo_bhai.Microservices.entity;

import lombok.Getter;
import lombok.Setter;

//import jakarta.persistence.*;

@Getter
@Setter
//@Entity
//@Table(name = "tasks_employee")
public class Employee {

//    @Id
    private Integer id;

    private String first_name;

    private String last_name;

    private Integer user_id;

}
