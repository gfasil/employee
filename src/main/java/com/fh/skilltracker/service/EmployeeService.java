package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {

    public List<Employee> findAll();
}
