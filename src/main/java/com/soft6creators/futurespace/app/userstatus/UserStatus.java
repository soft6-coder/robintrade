package com.soft6creators.futurespace.app.userstatus;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.soft6creators.futurespace.app.user.User;

@Entity
public class UserStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userStatusId;
	@ManyToOne
	private User user;
	private boolean isOnline;
	private String date;
	public int getUserStatusId() {
		return userStatusId;
	}
	public void setUserStatusId(int userStatusId) {
		this.userStatusId = userStatusId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public boolean isOnline() {
		return isOnline;
	}
	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	
	
	
}
