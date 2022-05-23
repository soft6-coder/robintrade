package com.soft6creators.futurespace.app.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsService userDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
		.antMatchers("/js/**").permitAll()
		.antMatchers("/css/*").permitAll()
		.antMatchers("/font awesome/**").permitAll()
		.antMatchers("/images/*").permitAll()
		.antMatchers("/").permitAll()
		.antMatchers("/wp-content/**").permitAll()
		.antMatchers("/wp-includes/**").permitAll()
		.antMatchers("/about.html").permitAll()
		.antMatchers("/commodity-trading.html").permitAll()
		.antMatchers("/consulting-services").permitAll()
		.antMatchers("/contact.html").permitAll()
		.antMatchers("/etfs.html").permitAll()
		.antMatchers("/faq.html").permitAll()
		.antMatchers("/financial-services.html").permitAll()
		.antMatchers("/investment-plans.html").permitAll()
		.antMatchers("/mutual-funds-and-initial-public-offerings.html").permitAll()
		.antMatchers("/non-farm-payrolls-npf.html").permitAll()
		.antMatchers("/portfolio-management-services.html").permitAll()
		.antMatchers("/services.html").permitAll()
		.antMatchers("/structured-finance.html").permitAll()
		.antMatchers("/").permitAll()
		.antMatchers("/get-started.html").permitAll()
		.antMatchers("/admin.html").hasAuthority("ADMIN")
		.antMatchers("/user").permitAll()
		.antMatchers("/interest").permitAll()
		.antMatchers("/verify/{verificationCode}").permitAll()
		.antMatchers("/getpropcountries").permitAll()
		.antMatchers("/getpropcities").permitAll()
		.antMatchers("/accounttypes").permitAll()
		.antMatchers("/cryptos").permitAll()
		.anyRequest().authenticated()
		.and().formLogin()
				.loginPage("/get-started.html").permitAll()
				.defaultSuccessUrl("/dashboard.html")
				.failureUrl("/get-started.html?status=failure");
	}
	
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

}
