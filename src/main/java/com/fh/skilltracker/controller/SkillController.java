/*code for controller which handles all CRUD requests related to skill domain
we have five methods in here:
1. retrieve all skills per employee
2. get skill by employee and skill id
3. update skill
4. delete skill
5. add skill
@Author fasil habtegiorgis

*/
package com.fh.skilltracker.controller;
import com.fh.skilltracker.domain.Skill;
import com.fh.skilltracker.exception.EntityNotFoundException;
import com.fh.skilltracker.service.EmployeeService;
import com.fh.skilltracker.service.SkillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


// setting up rest controller
@RestController
// all requests starting by "/employees" will hit this controller
@RequestMapping("employees")
public class SkillController {
    //setting up logger
    public static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    // this service provides all the service logic related to employee domain
    EmployeeService employeeService;

    // this service provides all the service logic related to skill domain
    SkillService skillService;

    // constructor injection to handle dependencies
    @Autowired
    public SkillController( EmployeeService employeeService,SkillService skillService) {
        this.skillService=skillService;
        this.employeeService=employeeService;
    }

    // ................Retrieve all skills for an employee................
    @GetMapping("/{employeeId}/skills")
    @CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
    public ResponseEntity<List<Skill>> getAllEmployeeSkillById(@PathVariable(name = "employeeId") String employeeId) {
        //start logging
        logger.info("fetching all skills for  employee with id id {}", employeeId);

        // send request to repo to get all skills for an employee
        List<Skill> skills = skillService.findAllEmployeeSkills(employeeId);
        if (skills.isEmpty()) {
            return new ResponseEntity<>(skills, HttpStatus.NOT_FOUND);
        }
        // return skills with status code 200
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    // ................Retrieve a skill for an employee................
    @GetMapping("/{employeeId}/skills/{skillId}")
    public ResponseEntity<?> getEmployeeSkillById(@PathVariable(name = "employeeId") String employeeId, @PathVariable(name = "skillId") String skillId) {
        //start logging
        logger.info("fetching skill with id {} for employee id {}", skillId, employeeId);
        // send request to repo to get  skill by employee and skill id
        Skill skill = skillService.findEmployeeSkillById(employeeId, skillId);
        // check if there is no record and return 404 status code
        if (skill.equals(null)) {
            logger.error("skill id {} not found", skillId);
            throw new EntityNotFoundException(Skill.class, "id", skillId);

        }
        // return skill with status code 200
        return new ResponseEntity<>(skill, HttpStatus.OK);
    }

    //..............adding skill for an employee................
    @PostMapping(value="/{employeeId}/skills" ,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSkill(@PathVariable(name = "employeeId") String employeeId, @RequestBody @Valid Skill skill) {
        //start logging
        logger.info("adding a skill {} for employee id :  {}", skill, employeeId);

        // send request to service to add skill
        Skill newSkill = skillService.addSkill(employeeId, skill);

        // return employee with status code 200
        return new ResponseEntity<>(newSkill, HttpStatus.OK);
    }

    //......................update a skill for an employee.............
    @PutMapping(value="/{employeeId}/skills/{skillId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putEmployeeById(@PathVariable(name = "employeeId") String employeeId, @PathVariable(name = "skillId") String skillId, @RequestBody @Valid Skill skill) {
        //start logging
        logger.info("fetching and updating employee skill info with skill id: {} and employee id: {}", skillId, employeeId);

        // send request to service to update skill for an employee
        Skill currentSkill1 = skillService.updateSkill(employeeId, skillId, skill);

        // check if employee was updated and return custom exception if it doesnt
        if (currentSkill1.equals(null)) {
            logger.error("skill id {} not found", skillId);
            throw new EntityNotFoundException(Skill.class, "id", skillId);

        }
        // return employee with status code 200
        return new ResponseEntity<>(currentSkill1, HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}/skills/{skillId}")
    public ResponseEntity<Skill> deleteEmployeeById(@PathVariable(name = "employeeId") String employeeId, @PathVariable(name = "skillId") String skillId) {
        //start logging
        logger.info("fetching and deleting employee skill info with skill id: {} and employee id: {}", skillId, employeeId);

        // send request to service to delete skill
        Skill skill = skillService.deleteSkillById(employeeId, skillId);
        // check if the skill was not deleted
        if (skill.equals(null)) {
            logger.error("skill id {} not found", skillId);
            throw new EntityNotFoundException(Skill.class, "id", skillId);

        }
        // return employee with status code 204
        return new ResponseEntity<Skill>(HttpStatus.NO_CONTENT);
    }

}
