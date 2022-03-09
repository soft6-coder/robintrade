package com.soft6creators.futurespace.app.investment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvestmentController {
	@Autowired
	private InvestmentService investmentService;
	
	
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
}
