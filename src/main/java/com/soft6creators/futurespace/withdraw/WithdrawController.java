package com.soft6creators.futurespace.withdraw;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WithdrawController {

	@Autowired
	private WithdrawService withdrawService;

	@RequestMapping(method = RequestMethod.POST, value="/withdraw")
	public Withdraw addWithdraw(@RequestBody Withdraw withdraw) {
		return withdrawService.addWithdraw(withdraw);
	}
	
	@RequestMapping("/withdraw/{withdrawId}")
	public Optional<Withdraw> getWithdraw(@PathVariable int withdrawId) {
		return withdrawService.getWithdraw(withdrawId);
	}
	
	@RequestMapping("/account/{accountId}/withdraw")
	public Optional<Withdraw> getWithdrawByAccount(@PathVariable int accountId) {
		return withdrawService.getWithdrawByAccount(accountId);
	}
	
}
