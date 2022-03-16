package com.soft6creators.futurespace.app.user;

import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountService;
import com.soft6creators.futurespace.app.mailsender.MailSenderService;

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
	@Autowired
	MailSenderService mailSenderService;

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

		try {
			sendVerificationEmail(user);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		finally {
			System.out.println("Exception Found");
		}
//		Account account = new Account();
//		if (user.getReferral() != null) {
//			account.setAccountBalance(200);
//		}
//		else {
//			account.setAccountBalance(100);
//		}
//		accountService.addAccount(account);
//		user.setAccount(account);
//		return userRepository.save(user);
		return user;
	}

	public Optional<User> getUser(String email) {
		return userRepository.findById(email);
	}

	private boolean checkUser(String email) {
		return userRepository.existsById(email);
	}

	private void sendVerificationEmail(User user) throws MessagingException {
		String toAddress = user.getEmail();
		String subject = "Future Space (One time password)";
		String content = "<div style=\"margin: 8px; box-shadow: 1px 1px 10px rgb(236, 236, 236)\">\r\n"
				+ "      <div\r\n"
				+ "        style=\"\r\n"
				+ "          padding: 8px 16px;\r\n"
				+ "          background-color: rgb(0, 50, 235);\r\n"
				+ "          color: white;\r\n"
				+ "          font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "        \"\r\n"
				+ "      >\r\n"
				+ "        <p style=\"font-size: 20px; font-weight: bold\">\r\n"
				+ "          FUTURE SPACE INVESTMENTS\r\n"
				+ "        </p>\r\n"
				+ "      </div>\r\n"
				+ "      <div style=\"padding: 8px; font-family: Arial, Helvetica, sans-serif\">\r\n"
				+ "        <p style=\"font-size: 14px; color: rgb(75, 75, 75)\">\r\n"
				+ "         " + user.getFullName() + ",Welcome to FutureSpace\r\n"
				+ "        </p>\r\n"
				+ "        <p style=\"font-size: 14px\">Here is your account activation code</p>\r\n"
				+ "        <p style=\"color: rgb(0, 50, 235)\">" + user.getVerificationCode() + "</p>\r\n"
				+ "        <p style=\"font-size: 14px; font-weight: bold\">Security tips:</p>\r\n"
				+ "        <ul style=\"font-size: 14px; font-weight: bold\">\r\n"
				+ "          <li>Never give your password to anyone</li>\r\n"
				+ "          <li>\r\n"
				+ "            Never call any phone number for someone claiming to be FutureSpace\r\n"
				+ "            Support\r\n"
				+ "          </li>\r\n"
				+ "          <li>\r\n"
				+ "            Never send any money to anyone claiming to be a member of\r\n"
				+ "            FutureSpace team\r\n"
				+ "          </li>\r\n"
				+ "          <li>Enable Google Two Factor Authentication.</li>\r\n"
				+ "        </ul>\r\n"
				+ "        <p style=\"font-size: 14px\">\r\n"
				+ "          If you don't recognize this activity, please contact our customer\r\n"
				+ "          support immediately.\r\n"
				+ "        </p>\r\n"
				+ "        <p style=\"font-size: 14px\">FutureSpace Team</p>\r\n"
				+ "        <p style=\"font-size: 14px\">\r\n"
				+ "          This is an automated message, Please do not reply\r\n"
				+ "        </p>\r\n"
				+ "      </div>\r\n"
				+ "    </div>";

		mailSenderService.sendEmail(toAddress, subject, content);
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
