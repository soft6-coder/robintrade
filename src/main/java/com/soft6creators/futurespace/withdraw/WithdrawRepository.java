package com.soft6creators.futurespace.withdraw;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawRepository extends CrudRepository<Withdraw, Integer> {

	public Optional<Withdraw> findByAccountAccountId(int accountId);
}
