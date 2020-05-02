package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,String> {
}
