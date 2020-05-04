package com.fh.skilltracker.controller;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.exception.CustomErrorType;
import com.fh.skilltracker.exception.EntityNotFoundException;
import com.fh.skilltracker.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("employees")
public class EmployeeController {
    public static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
    @Autowired
    EmployeeService employeeService;

    // ................Retrieve all employees................
    @GetMapping("")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        logger.info("fetching all employees");
        List<Employee> employees = employeeService.findAll();
        if (employees.isEmpty()) {
            return new ResponseEntity<>(employees, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // ................Retrieve single employee.................

    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getEmployeeById(@PathVariable(name = "employeeId") String id) {
        logger.info("fetching employee id {}", id);
        Employee employee = employeeService.findById(id);
        if (employee.equals(null)) {
            logger.error("employee id {} not found", id);
            throw new EntityNotFoundException(Employee.class, "id", id);

        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    //................create new employee.....................

    @PostMapping("")
    public ResponseEntity<?> addEmployee(@RequestBody  Employee employee) {
        logger.info("creating an employee:  {}", employee);
        if (employeeService.isEmployeeExists(employee)) {
            logger.error("employee with first name {} and last name {} already exists",
                    employee.getFirstName(), employee.getLastName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. An employee with name " +
                    employee.getFirstName() + employee.getLastName() + " already exist."), HttpStatus.CONFLICT);
        }
        employeeService.add(employee);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    //...................updating an employee..........................
    @PutMapping("/{employeeId}")
    public ResponseEntity<?> putEmployeeById(@PathVariable(name = "employeeId") String id, @RequestBody @Valid Employee employee) {
        logger.info("fetching and updating employee info with id {}",id);
        Employee currentEmployee= employeeService.update(id, employee);
        if (currentEmployee.equals(null)) {
            logger.error("employee id {} not found", id);
            throw new EntityNotFoundException(Employee.class, "id", id);

        }
        return new ResponseEntity<>(currentEmployee,HttpStatus.OK);
    }

    //...................deleting an employee..........................
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Employee> deleteEmployeeById(@PathVariable(name = "employeeId") String id) {
        logger.info("fetching and deleting employee info with id {}",id);
        Employee currentEmployee=employeeService.deleteById(id);
        if (currentEmployee.equals(null)) {
            logger.error("unable to delete. employee id {} not found", id);
            throw new EntityNotFoundException(Employee.class, "id", id);

        }
        return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
    }


}
