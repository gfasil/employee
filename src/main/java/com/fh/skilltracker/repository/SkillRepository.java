package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends CrudRepository<Skill,String> {
}
