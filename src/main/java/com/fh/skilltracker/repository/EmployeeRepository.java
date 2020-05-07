package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,String> {

    public List<Employee> findAll();
    public Employee getEmployeeById(String id);
    public Employee findByFirstNameAndLastName(String firstName,String lastName);
}
