package com.soft6creators.futurespace.app.accounttype;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountTypeController {
	@Autowired
	private AccountTypeService accountTypeService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/accounttype")
	public AccountType addAccountType(@RequestBody AccountType accountType) {
		return accountTypeService.addAccountType(accountType);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "accounttypes")
	public List<AccountType> addAccountTypes(@RequestBody List<AccountType> accountTypes) {
		return accountTypeService.addAccountTypes(accountTypes);
	}
	
	@RequestMapping("/accounttype")
	public List<AccountType> getAccountTypes() {
		return accountTypeService.getAccountTypes();
	}
}
