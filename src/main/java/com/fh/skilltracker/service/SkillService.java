package com.fh.skilltracker.service;

import com.fh.skilltracker.domain.Skill;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public interface SkillService {
    List<Skill> findAllEmployeeSkills(String employeeId);
    Skill findEmployeeSkillById(String employeeId, String skillId);
    Skill addSkill(String employeeId, @Valid Skill skill);
    Skill updateSkill(String employeeId, String skillId, @Valid Skill skill);
    Skill deleteSkillById(String employeeId, String skillId);

}
