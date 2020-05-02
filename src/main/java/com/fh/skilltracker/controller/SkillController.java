package com.fh.skilltracker.controller;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.domain.Skill;
import com.fh.skilltracker.service.EmployeeService;
import com.fh.skilltracker.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("employees")
public class SkillController {
        @Autowired
        EmployeeService employeeService;
        @Autowired
        SkillService skillService;

    @GetMapping("/{employeeId}/skills")
    public List<Skill> getEmployeeSkillById(@PathVariable(name = "employeeId") String id){

        return null;
    }
    @GetMapping("/{employeeId}/skills/{skillId}")
    public Skill getEmployeeSkillById(@PathVariable(name = "employeeId") String id,@PathVariable(name = "skillId")  String skillId){


        return null;
    }

    @PutMapping("/{employeeId}/skills/{skillId}")
    public Skill  putEmployeeById(@PathVariable(name = "employeeId")  String employeeId,@PathVariable(name = "skillId")  String skillId, @Valid Employee employee){

        return null;
    }

    @DeleteMapping("/{employeeId}/skills/{skillId}")
    public ResponseEntity.BodyBuilder deleteEmployeeById(@PathVariable(name = "employeeId") String id, @PathVariable(name = "skillId")  String skillId){


        return ResponseEntity.status(200);
    }

}
