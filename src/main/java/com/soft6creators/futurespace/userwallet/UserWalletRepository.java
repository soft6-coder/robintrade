package com.soft6creators.futurespace.userwallet;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserWalletRepository extends CrudRepository<UserWallet, Integer> {
	public List<UserWallet> findByAccountAccountId(int accountId);
	
}
