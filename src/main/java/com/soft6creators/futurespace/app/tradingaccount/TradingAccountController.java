package com.soft6creators.futurespace.app.tradingaccount;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TradingAccountController {

	@Autowired
	TradingAccountService tradingAccountService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/tradingaccount")
	public TradingAccount addTradingAccount(@RequestBody TradingAccount tradingAccount) {
		return tradingAccountService.addTradingAccount(tradingAccount);
	}
	
	@RequestMapping("/tradingaccount/{tradingAccountId}")
	public Optional<TradingAccount> getTradingAccount(@PathVariable int tradingAccountId) {
		return tradingAccountService.getTradingAccount(tradingAccountId);
	}
	
}
