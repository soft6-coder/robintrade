package com.soft6creators.futurespace.userwallet;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserWalletService {

	@Autowired
	private UserWalletRepository userWalletRepository;
	
	public UserWallet addUserWallet(UserWallet userWallet) {
		return userWalletRepository.save(userWallet);
	}
	
	public List<UserWallet> getUserWalletsByAccount(int accountId) {
		return userWalletRepository.findByAccountAccountId(accountId);
	}
	
	public void deleteUserWallet(int userWalletId) {
		userWalletRepository.deleteById(userWalletId);
	}
}
