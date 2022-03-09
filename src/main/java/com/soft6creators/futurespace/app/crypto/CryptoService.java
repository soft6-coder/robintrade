package com.soft6creators.futurespace.app.crypto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CryptoService {
	@Autowired
	private CryptoRepository cryptoRepository;
	
	public Crypto addCrypto(Crypto crypto) {
		return cryptoRepository.save(crypto);
	}
	
	public List<Crypto> addCryptos(List<Crypto> cryptos) {
		 return (List<Crypto>) cryptoRepository.saveAll(cryptos);
	}
	
	public List<Crypto> getCryptos() {
		 return (List<Crypto>) cryptoRepository.findAll();
	}

}
