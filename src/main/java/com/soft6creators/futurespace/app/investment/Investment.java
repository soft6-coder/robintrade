package com.soft6creators.futurespace.app.investment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.crypto.Crypto;

@Entity
public class Investment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int investmentId;
	@ManyToOne
	private Account account;
	@OneToOne
	private Crypto currency;
	private int investedAmount;
	private int weeks;
	private boolean isActive;
	private String date;
	public int getInvestmentId() {
		return investmentId;
	}
	public void setInvestmentId(int investmentId) {
		this.investmentId = investmentId;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public Crypto getCurrency() {
		return currency;
	}
	public void setCurrency(Crypto currency) {
		this.currency = currency;
	}
	public int getInvestedAmount() {
		return investedAmount;
	}
	public void setInvestedAmount(int investedAmount) {
		this.investedAmount = investedAmount;
	}
	public int getWeeks() {
		return weeks;
	}
	public void setWeeks(int weeks) {
		this.weeks = weeks;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
}
