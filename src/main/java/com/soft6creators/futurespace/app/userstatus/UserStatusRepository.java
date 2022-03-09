package com.soft6creators.futurespace.app.userstatus;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatusRepository extends CrudRepository<UserStatus, Integer> {
	public UserStatus findFirstByUserEmailOrderByUserStatusIdDesc(String email);
}
