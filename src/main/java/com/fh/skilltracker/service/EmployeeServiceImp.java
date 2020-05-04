package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.domain.Skill;
import com.fh.skilltracker.exception.EntityNotFoundException;
import com.fh.skilltracker.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        Employee emp= employeeRepository.getEmployeeById(id);
    if(emp==null){
        throw new EntityNotFoundException(Employee.class,"id",id);
    }
        System.out.println("employe in service first"+emp);
    return emp;
    }

    @Override
    public Employee findByFirstAndLastName(String firstName, String lastName) {
        return employeeRepository.findByFirstNameAndLastName(firstName,lastName);
    }

    @Override
    public Employee deleteById(String id) {
        Employee currentEmployee= employeeRepository.getEmployeeById(id);
        if (currentEmployee.equals(null)) {
            return null;
        }
        employeeRepository.delete(currentEmployee);

       return currentEmployee;
    }

    @Override
    public Employee add(@Valid Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee update(String id, @Valid Employee employee) {

        Employee currentEmployee=findById(id);
        if (currentEmployee.equals(null)) {
            return null;
        }
        currentEmployee.setAddress(employee.getAddress());
        currentEmployee.setAssignedTo(employee.getAssignedTo());
        currentEmployee.setAddress(employee.getAddress());
        currentEmployee.setBirthDate(employee.getBirthDate());
        currentEmployee.setBusinessUnit(employee.getBusinessUnit());
        currentEmployee.setCompanyEmail(employee.getCompanyEmail());
        currentEmployee.setHiredDate(employee.getHiredDate());
        currentEmployee.setFirstName(employee.getFirstName());
        currentEmployee.setLastName(employee.getLastName());
        currentEmployee.setRole(employee.getRole());
        List<Skill> skills=new ArrayList<>();
        skills.addAll(employee.getSkills());
        currentEmployee.setSkills(skills);

        return employeeRepository.save(currentEmployee);
    }

    @Override
    public boolean isEmployeeExists(Employee employee) {
        return (findByFirstAndLastName(employee.getFirstName(),employee.getLastName())!=null) ;

    }

}
