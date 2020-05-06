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

@RestController
@RequestMapping("employees")
//@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
public class SkillController {
    @Autowired
    EmployeeService employeeService;
    @Autowired
    SkillService skillService;

    public static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    // ................Retrieve all skills for an employee................
    @GetMapping("/{employeeId}/skills")
    @CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
    public ResponseEntity<List<Skill>> getAllEmployeeSkillById(@PathVariable(name = "employeeId") String employeeId) {
        logger.info("fetching all skills for  employee with id id {}", employeeId);
        List<Skill> skills = skillService.findAllEmployeeSkills(employeeId);
        if (skills.isEmpty()) {
            return new ResponseEntity<>(skills, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    // ................Retrieve a skill for an employee................
    @GetMapping("/{employeeId}/skills/{skillId}")
    public ResponseEntity<?> getEmployeeSkillById(@PathVariable(name = "employeeId") String employeeId, @PathVariable(name = "skillId") String skillId) {

        logger.info("fetching skill with id {} for employee id {}", skillId, employeeId);
        Skill skill = skillService.findEmployeeSkillById(employeeId, skillId);
        if (skill.equals(null)) {
            logger.error("skill id {} not found", skillId);
            throw new EntityNotFoundException(Skill.class, "id", skillId);

        }
        return new ResponseEntity<>(skill, HttpStatus.OK);
    }

    //..............adding skill for an employee................
    @PostMapping(value="/{employeeId}/skills" ,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSkill(@PathVariable(name = "employeeId") String employeeId, @RequestBody @Valid Skill skill) {
        logger.info("adding a skill {} for employee id :  {}", skill, employeeId);
        Skill newSkill = skillService.addSkill(employeeId, skill);
        return new ResponseEntity<>(newSkill, HttpStatus.OK);
    }

    //......................update a skill for an employee.............
    @PutMapping(value="/{employeeId}/skills/{skillId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putEmployeeById(@PathVariable(name = "employeeId") String employeeId, @PathVariable(name = "skillId") String skillId, @RequestBody @Valid Skill skill) {
        logger.info("fetching and updating employee skill info with skill id: {} and employee id: {}", skillId, employeeId);

        Skill currentSkill1 = skillService.updateSkill(employeeId, skillId, skill);
        if (currentSkill1.equals(null)) {
            logger.error("skill id {} not found", skillId);
            throw new EntityNotFoundException(Skill.class, "id", skillId);

        }
        return new ResponseEntity<>(currentSkill1, HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}/skills/{skillId}")
    public ResponseEntity<Skill> deleteEmployeeById(@PathVariable(name = "employeeId") String employeeId, @PathVariable(name = "skillId") String skillId) {
        logger.info("fetching and deleting employee skill info with skill id: {} and employee id: {}", skillId, employeeId);
        Skill skill = skillService.deleteSkillById(employeeId, skillId);

        if (skill.equals(null)) {
            logger.error("skill id {} not found", skillId);
            throw new EntityNotFoundException(Skill.class, "id", skillId);

        }
        return new ResponseEntity<Skill>(HttpStatus.NO_CONTENT);
    }

}
