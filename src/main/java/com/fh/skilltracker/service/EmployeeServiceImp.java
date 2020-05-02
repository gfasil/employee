package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.domain.Skill;
import com.fh.skilltracker.exception.EntityNotFoundException;
import com.fh.skilltracker.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImp implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee findById(String id) {
        return employeeRepository.findById(id).orElseThrow(()->new EntityNotFoundException(Employee.class,"id",id));
    }

    @Override
    public ResponseEntity<?> deleteById(String id) {
        employeeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public Employee add(@Valid Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee update(String id, @Valid Employee employee) {
        Employee emp=employeeRepository.findById(id).orElseThrow(()->new EntityNotFoundException(Employee.class,"id",id));
        emp.setAddress(employee.getAddress());
        emp.setAssignedTo(employee.getAssignedTo());
        emp.setAddress(employee.getAddress());
        emp.setBirthDate(employee.getBirthDate());
        emp.setBusinessUnit(employee.getBusinessUnit());
        emp.setCompanyEmail(employee.getCompanyEmail());
        emp.setHiredDate(employee.getHiredDate());
        emp.setFirstName(employee.getFirstName());
        emp.setLastName(employee.getLastName());
        emp.setRole(employee.getRole());
        List<Skill> skills=new ArrayList<>();
        skills.addAll(employee.getSkills());
        emp.setSkills(skills);

        return employeeRepository.save(emp);
    }
}
