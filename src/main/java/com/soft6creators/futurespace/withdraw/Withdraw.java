package com.soft6creators.futurespace.withdraw;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.userwallet.UserWallet;

@Entity
public class Withdraw {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int withdrawId;
	@ManyToOne
	private UserWallet userWallet;
	private String withdrawAmount;
	@OneToOne
	private Account account;
	private String otw;
	public int getWithdrawId() {
		return withdrawId;
	}
	public void setWithdrawId(int withdrawId) {
		this.withdrawId = withdrawId;
	}
	public UserWallet getUserWallet() {
		return userWallet;
	}
	public void setUserWallet(UserWallet userWallet) {
		this.userWallet = userWallet;
	}
	public String getWithdrawAmount() {
		return withdrawAmount;
	}
	public void setWithdrawAmount(String withdrawAmount) {
		this.withdrawAmount = withdrawAmount;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public String getOtw() {
		return otw;
	}
	public void setOtw(String otw) {
		this.otw = otw;
	}
	
	
}
