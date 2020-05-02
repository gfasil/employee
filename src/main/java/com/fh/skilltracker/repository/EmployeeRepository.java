package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee,String> {

    public List<Employee> findAll();
}
