package com.soft6creators.futurespace.app.investment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountService;

@RestController
public class InvestmentController {
	@Autowired
	private InvestmentService investmentService;
	@Autowired
	private AccountService accountService;
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/investment")
	public Investment addInvestment(@RequestBody Investment investment) {
		return investmentService.addInvestment(investment);
	}
	
	@RequestMapping("/investment/{investmentId}")
	public Optional<Investment> getInvestment(@PathVariable int investmentId) {
		return investmentService.getInvestMent(investmentId);
	}
	
	@RequestMapping("/account/{accountId}/investment")
	public Optional<Investment> getInvestmentByAccount(@PathVariable int accountId) {
		return investmentService.getInvestmentByAccount(accountId);
	}
	
	@RequestMapping("/investment/{investmentId}/isactive")
	public boolean isActive(@PathVariable int investmentId) {
		Optional<Investment> investment = investmentService.getInvestMent(investmentId);
		return investment.get().isActive();
	}
	
	@RequestMapping("/investment/{investmentId}/roi/{roi}")
	public void investmentComplete(@PathVariable int investmentId,@PathVariable int roi) {
		Optional<Investment> investment = investmentService.getInvestMent(investmentId);
		investment.get().setActive(false);
		Optional<Account> account = accountService.getAccount(investment.get().getAccount().getAccountId());
		account.get().setAccountBalance(roi);
		accountService.addAccount(account.get());
		investmentService.addInvestment(investment.get());	
	}
}
