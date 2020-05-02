package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Field;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldRepository extends CrudRepository<Field,String> {
}
