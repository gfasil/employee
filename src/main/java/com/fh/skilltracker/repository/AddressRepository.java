package com.fh.skilltracker.repository;

import com.fh.skilltracker.domain.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address,String> {
}
