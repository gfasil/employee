package com.fh.skilltracker.controller;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("")
    public List<Employee>  getAllEmployee(){
        return null;
    }
    @PostMapping("")
    public Employee  addEmployee(Employee employee){

        return null;
    }
    @GetMapping("/{employeeId}")
    public Employee  getEmployeeById(@PathVariable(name = "employeeId") String id){

        return null;
    }
    @DeleteMapping("/{employeeId}")
    public Employee  deleteEmployeeById(@PathVariable(name = "employeeId") String id){


        return null;
    }
    @PutMapping("/{employeeId}")
    public Employee  putEmployeeById(@PathVariable(name = "employeeId")  String id, @Valid Employee employee){

        return null;
    }

}
