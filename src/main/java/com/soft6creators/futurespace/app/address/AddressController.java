package com.soft6creators.futurespace.app.address;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/address")
	public Address addAddress(@RequestBody Address address) {
		return addressService.addAddress(address);
	}
	
	@RequestMapping("/address/{addressId}")
	public Optional<Address> getAddress(@PathVariable int addressId) {
		return addressService.getAddress(addressId);
	}
	
	@RequestMapping("/address/user/{email}")
	public Address getAddressByEmail(@PathVariable String email) {
		return addressService.getAddressByEmail(email);
	}
	
	@RequestMapping("/admin/address")
	public List<Address> getAddresses() {
		return addressService.getAddresses();
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/address")
	public Address updateAddress(@RequestBody Address address) {
		return addressService.addAddress(address);
	}
}
