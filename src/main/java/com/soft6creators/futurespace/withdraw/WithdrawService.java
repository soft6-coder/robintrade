package com.soft6creators.futurespace.withdraw;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WithdrawService {

	@Autowired
	private WithdrawRepository withdrawRepository;
	
	public Withdraw addWithdraw(Withdraw withdraw) {
		return withdrawRepository.save(withdraw);
	}
	
	public Optional<Withdraw> getWithdraw(int withdawId) {
		return withdrawRepository.findById(withdawId);
	}
	
	public Optional<Withdraw> getWithdrawByAccount(int accountId) {
		return withdrawRepository.findByAccountAccountId(accountId);
	}
}
