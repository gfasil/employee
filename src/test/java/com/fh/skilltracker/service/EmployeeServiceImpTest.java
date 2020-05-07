package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.domain.ROLE;
import com.fh.skilltracker.repository.EmployeeRepository;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class EmployeeServiceImpTest {
    //mocking our repository
    @Mock
    EmployeeRepository employeeRepository;
    //injecting the test case object
    @InjectMocks
    EmployeeServiceImp employeeService;
    Employee employee;
    @BeforeEach
    void setUp() throws Exception{
        MockitoAnnotations.initMocks(this);
        employee=new Employee();
        employee.setId(UUID.randomUUID().toString());
        employee.setRole(ROLE.TECHNICAL_CONSULTANT);
        employee.setFirstName("Fasil");
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findAll() {

        when(employeeRepository.findAll()).thenReturn(Arrays.asList(employee));
        List<Employee> emp= employeeService.findAll();
        Assert.assertNotNull(emp);
        Assert.assertEquals(Arrays.asList(employee),emp);
    }

    @Test
    void findById() {

        when(employeeRepository.getEmployeeById(anyString())).thenReturn(employee);
        Employee emp= employeeService.findById(employee.getId());
        Assert.assertNotNull(emp);
        Assert.assertEquals(employee,emp);
        Assert.assertEquals(employee.getFirstName(),emp.getFirstName());
    }

    @Test
    void findByFirstAndLastName() {

        Employee employee=new Employee();
        employee.setId(UUID.randomUUID().toString());
        employee.setRole(ROLE.TECHNICAL_CONSULTANT);
        employee.setFirstName("Fasil");
        employee.setFirstName("Habtegiorgis");
        when(employeeRepository.findByFirstNameAndLastName(anyString(),anyString())).thenReturn(employee);
        Employee emp= employeeService.findByFirstAndLastName("doe","jhon");

        // check if the service is not returning null
        Assert.assertNotNull(emp);

        // check if the service is returning the desired object
        Assert.assertEquals(employee,emp);
        Assert.assertEquals(employee.getFirstName(),emp.getFirstName());
    }
}