package com.soft6creators.futurespace.userwallet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserWalletController {

	@Autowired
	private UserWalletService userWalletService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/userwallet")
	public UserWallet addUserWallet(@RequestBody UserWallet userWallet) {
		return userWalletService.addUserWallet(userWallet);
	}
	
	@RequestMapping("/account/{accountId}/userwallet")
	public List<UserWallet> getUserWalletsByAccount(@PathVariable int accountId) {
		return userWalletService.getUserWalletsByAccount(accountId);
		
	}
	
	@RequestMapping("/userwallet/{userWalletId}/delete")
	public void deleteUserWallet(@PathVariable int userWalletId) {
		userWalletService.deleteUserWallet(userWalletId);
	}
}
