package com.soft6creators.futurespace.app.account;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
	
	@Autowired
	private AccountService accountService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/account")
	public Account addAccount(@RequestBody Account account) {
		return accountService.addAccount(account);
	}
	@RequestMapping("/account")
	public List<Account> getAccounts() {
		return accountService.getAccounts();
	}

}
