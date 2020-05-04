package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Employee;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public interface EmployeeService {

    public List<Employee> findAll();
    public Employee findById(String id);
    public Employee findByFirstAndLastName(String firstName,String lastName);
    public Employee deleteById(String id);
    public Employee add(@Valid Employee employee);
    public Employee update(String id, @Valid Employee employee);
    public boolean isEmployeeExists(Employee employee);

}
