package com.soft6creators.futurespace.app.tradingaccount;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TradingAccountService {

	@Autowired
	private TradingAccountRepository tradingAccountRepository;
	
	public TradingAccount addTradingAccount(TradingAccount tradingAccount) {
		return tradingAccountRepository.save(tradingAccount);
	}
	
	public Optional<TradingAccount> getTradingAccount(int tradingAccountId) {
		return tradingAccountRepository.findById(null);
	}
}
