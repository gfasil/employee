package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Skill;
import org.springframework.data.repository.CrudRepository;

public interface SkillRepository extends CrudRepository<Skill,String> {
}
