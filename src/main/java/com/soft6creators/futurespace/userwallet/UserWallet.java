package com.soft6creators.futurespace.userwallet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.crypto.Crypto;

@Entity
public class UserWallet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userWalletId;
	private String userWalletAddress;
	@OneToOne
	private Crypto crypto;
	@ManyToOne
	private Account account;
	public int getUserWalletId() {
		return userWalletId;
	}
	public void setUserWalletId(int userWalletId) {
		this.userWalletId = userWalletId;
	}
	
	public Crypto getCrypto() {
		return crypto;
	}
	public void setCrypto(Crypto crypto) {
		this.crypto = crypto;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public String getUserWalletAddress() {
		return userWalletAddress;
	}
	public void setUserWalletAddress(String userWalletAddress) {
		this.userWalletAddress = userWalletAddress;
	}
	
	
	
	
}
