/*code for controller which handles all CRUD requests related to employee domain
we have five methods in here:
1. retrieve all employees
2. get employee by id
3. update employee
4. delete employee
5. create employee
@Author fasil habtegiorgis

*/
package com.fh.skilltracker.controller;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.exception.CustomErrorType;
import com.fh.skilltracker.exception.EntityNotFoundException;
import com.fh.skilltracker.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

// setting up rest controller
@RestController
// all requests starting by "/employees" will hit this controller
@RequestMapping("employees")
public class EmployeeController {
    //setting up logger
    public static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    // this service provides all the service logic related to employee domain
    EmployeeService employeeService;

    // constructor injection to handle dependencies
    @Autowired
    public EmployeeController( EmployeeService employeeService){
        this.employeeService=employeeService;
    }

    // ................Retrieve all employees................
    @GetMapping("")
    public ResponseEntity<List<Employee>> getAllEmployee(HttpServletResponse response) {
        //start logging
        logger.info("fetching all employees");

        // send request to service to get all employees
        List<Employee> employees = employeeService.findAll();

        // add header to the response
        response.addIntHeader("The total count of Perficient employees returned",employees.size());
        // check if there is no record and return 404 status code
        if (employees.isEmpty()) {
            logger.error("no employee found");
            return new ResponseEntity<>(employees, HttpStatus.NOT_FOUND);
        }
        // return employees with status code 200
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // ................Retrieve single employee.................

    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getEmployeeById(@PathVariable(name = "employeeId") String id) {
        logger.info("fetching employee id {}", id);
        // send request to service to get  employees by id
        Employee employee = employeeService.findById(id);

        // check if there is no record and return 404 status code
        if (employee.equals(null)) {

            logger.error("employee id {} not found", id);
            throw new EntityNotFoundException(Employee.class, "id", id);

        }
        // return employee with status code 200
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    //................create new employee.....................

    @PostMapping(value="",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public ResponseEntity<?> addEmployee(@RequestBody  Employee employee) {
        //start logging
        logger.info("creating an employee:  {}", employee);

        // check if employee with same full name exists and return status 409
        if (employeeService.isEmployeeExists(employee)) {
            logger.error("employee with first name {} and last name {} already exists",
                    employee.getFirstName(), employee.getLastName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. An employee with name " +
                    employee.getFirstName() + employee.getLastName() + " already exist."), HttpStatus.CONFLICT);
        }
        // send request to service to add employee
        employeeService.add(employee);

        // return employee with status code 200
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    //...................updating an employee..........................
    @PutMapping(value="/{employeeId}",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> putEmployeeById(@PathVariable(name = "employeeId") String id, @RequestBody @Valid Employee employee) {
        //start logging
        logger.info("fetching and updating employee info with id {}",id);

        // send request to service to update employee
        Employee currentEmployee= employeeService.update(id, employee);

        // check if employee was updated and return custom exception if it doesnt
        if (currentEmployee.equals(null)) {
            logger.error("employee id {} not found", id);
            throw new EntityNotFoundException(Employee.class, "id", id);

        }
        // return employee with status code 200
        return new ResponseEntity<>(currentEmployee,HttpStatus.OK);
    }

    //...................deleting an employee..........................
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Employee> deleteEmployeeById(@PathVariable(name = "employeeId") String id) {
        //start logging
        logger.info("fetching and deleting employee info with id {}",id);

        // send request to service to delete employee
        Employee currentEmployee=employeeService.deleteById(id);
        // check if the employee was not deleted
        if (currentEmployee.equals(null)) {
            logger.error("unable to delete. employee id {} not found", id);
            throw new EntityNotFoundException(Employee.class, "id", id);

        }
        // return employee with status code 204
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
