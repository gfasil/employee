package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Employee;
import com.fh.skilltracker.domain.Skill;
import com.fh.skilltracker.exception.EntityNotFoundException;
import com.fh.skilltracker.repository.EmployeeRepository;
import com.fh.skilltracker.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public class SkillServiceImp implements SkillService {

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    EmployeeService employeeService;
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<Skill> findAllEmployeeSkills(String employeeId) {
        Employee employee = employeeService.findById(employeeId);


        return employee.getSkills();
    }

    @Override
    public Skill findEmployeeSkillById(String employeeId, String skillId) {
        Skill skill = skillRepository.findById(skillId).orElseThrow(()->new EntityNotFoundException(Skill.class,"id",skillId));
        Employee employee = employeeService.findById(employeeId);

        if(!employee.getSkills().contains(skill)) throw new EntityNotFoundException(Skill.class,"id",skillId);

        return skill;
    }

    @Override
    public Skill addSkill(String employeeId, @Valid Skill skill) {

        Employee employee = employeeService.findById(employeeId);
        employee.getSkills().add(skill);

        employeeService.update(employeeId, employee);
        return skill;
    }

    @Override
    public Skill updateSkill(String employeeId, String skillId, @Valid Skill skill) {
        // Employee employee = employeeService.findById(employeeId);

        Skill oldSkill = findEmployeeSkillById(employeeId, skillId);

        oldSkill.setDescription(skill.getDescription());
        oldSkill.setExperience(skill.getExperience());
        oldSkill.setField(skill.getField());
        oldSkill.setSummary(skill.getSummary());
        skillRepository.save(oldSkill);

        return oldSkill;
    }

    @Override
    public Skill deleteSkillById(String employeeId, String skillId) {
        Employee employee = employeeService.findById(employeeId);
        Skill skill = findEmployeeSkillById(employeeId, skillId);
        if (skill.equals(null)||employee.equals(null)) {
            return null;
        }
        employee.getSkills().remove(skill);
        employeeService.update(employeeId,employee);

        return skill;
    }
}
