package com.soft6creators.futurespace.app.investment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountRepository;

@Service
public class InvestmentService {

	@Autowired
	private InvestmentRepository investmentRepository;
	@Autowired
	private AccountRepository accountRepository;
	
	public Investment addInvestment(Investment investment) {
		Optional<Account> account = accountRepository.findById(investment.getAccount().getAccountId());
		if (account.get().getInterestPreference() == null) {
			account.get().setInterestPreference(investment.getCurrency());
			accountRepository.save(account.get());
		}
		return investmentRepository.save(investment);
	}
	
	public Optional<Investment> getInvestmentByAccount(@PathVariable int accountId) {
		return investmentRepository.findByAccountAccountId(accountId);
	}
	
	public Optional<Investment> getInvestMent(int investmentId) {
		return investmentRepository.findById(investmentId);
	}
}
