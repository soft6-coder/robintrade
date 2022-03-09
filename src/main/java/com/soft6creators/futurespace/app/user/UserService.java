package com.soft6creators.futurespace.app.user;

import java.util.Calendar;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountService;
import com.soft6creators.futurespace.app.crypto.Crypto;
import com.soft6creators.futurespace.app.crypto.CryptoService;

import net.bytebuddy.utility.RandomString;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AccountService accountService;

	public User addUser(User user) {
		if (checkUser(user.getEmail())) {
			return new User();
		}
		String randomCode = RandomString.make(6);
		user.setVerificationCode(randomCode);
		user.setReferralId(user.getFullName().trim() + "-" + RandomString.make(6));
		if (user.getReferral() != null) {
			User userReferral = userRepository.findByReferralId(user.getReferral().getReferralId());
			if (userReferral != null) {
				user.setReferral(userReferral);
			} else {
				User wrongReferral = new User();
				wrongReferral.setReferral(user.getReferral());
				return wrongReferral;
			}
		}

//		try {
//			sendVerificationEmail(user);
//		} catch (MessagingException e) {
//			e.printStackTrace();
//		}
		Account account = new Account();
		if (user.getReferral() != null) {
			account.setAccountBalance(200);
		}
		else {
			account.setAccountBalance(100);
		}
		accountService.addAccount(account);
		user.setAccount(account);
		return userRepository.save(user);
	}

	public Optional<User> getUser(String email) {
		return userRepository.findById(email);
	}

	private boolean checkUser(String email) {
		return userRepository.existsById(email);
	}

	private void sendVerificationEmail(User user) throws MessagingException {
		String toAddress = user.getEmail();
		String fromAddress = "futurespaceinvestments@gmail.com";
		String subject = "Future Space (One time password)";
		String content = "<h1>Future Space</h1><p>DO NOT DISCLOSE. Dear " + user.getFullName()
				+ " Thank you for creating a FutureSpace Investment Account.</p> <p>The OTP for your Future Space Account confirmation is"
				+ user.getVerificationCode() + " .</p> <p> Thank you for choosing Futurespace Investments </p>";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom(fromAddress);
		helper.setTo(toAddress);
		helper.setSubject(subject);
		helper.setText(content, true);
		mailSender.send(message);
	}

	public boolean verify(String verificationCode) {
		User user = userRepository.findByVerificationCode(verificationCode);
		if (user == null || user.isActive()) {
			return false;
		} else {
			user.setVerificationCode(null);
			user.setActive(true);
			userRepository.save(user);
			return true;
		}
	}

}
