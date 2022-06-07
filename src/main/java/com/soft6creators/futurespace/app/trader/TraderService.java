package com.soft6creators.futurespace.app.trader;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TraderService {
	@Autowired
	private TraderRepository traderRepository;
	
	
	public Trader addTrader(Trader trader) {
		return traderRepository.save(trader);
	}
	
	public List<Trader> addTraders(List<Trader> traders) {
		return (List<Trader>) traderRepository.saveAll(traders);
	}
	public Optional<Trader> getTrader(int traderId) {
		return  traderRepository.findById(traderId);
	}
	
	public List<Trader> getTraders() {
		return (List<Trader>) traderRepository.findAll();
	}
}
