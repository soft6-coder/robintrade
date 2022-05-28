package com.soft6creators.futurespace.app.investment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountRepository;
import com.soft6creators.futurespace.app.crypto.Crypto;
import com.soft6creators.futurespace.app.crypto.CryptoService;

@Service
public class InvestmentService {

	@Autowired
	private InvestmentRepository investmentRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private CryptoService cryptoService;

	public Investment addInvestment(Investment investment) {
		Crypto crypto = cryptoService.getCryptoByName(investment.getCurrency().getCrypto());
		Optional<Account> account = accountRepository.findById(investment.getAccount().getAccountId());
		if (crypto != null) {
			investment.setCurrency(crypto);
		} else {
			Crypto defaultCrypto = new Crypto();
			defaultCrypto.setCryptoId(1);
			investment.setCurrency(defaultCrypto);
		}
		investment.setCurrency(crypto);
		investment.setActive(true);
		
			if (account.get().getInterestPreference() == null) {
				account.get().setInterestPreference(investment.getCurrency());
				account.get().setInterestPreference(investment.getCurrency());
				accountRepository.save(account.get());
			}
			account.get().setAccountBalance(investment.getInvestedAmount());
			accountRepository.save(account.get());
		

		return investmentRepository.save(investment);

	}

	public Optional<Investment> getInvestmentByAccount(@PathVariable int accountId) {
		return investmentRepository.findByAccountAccountId(accountId);
	}

	public Optional<Investment> getInvestMent(int investmentId) {
		return investmentRepository.findById(investmentId);
	}
}
