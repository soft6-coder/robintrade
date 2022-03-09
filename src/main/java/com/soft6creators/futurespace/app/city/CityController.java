package com.soft6creators.futurespace.app.city;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CityController {

	@Autowired
	private CityService cityService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/cities")
	public List<City> addCities(@RequestBody List<City> cities) {
		return cityService.addCities(cities);
	}
	
	@RequestMapping("/cities")
	public List<City> getCities() {
		return cityService.getCities();
	}
	
	@RequestMapping("/country/{countryId}/city")
	public List<City> getCityByCountry(@PathVariable int countryId) {
		return cityService.getCityByCountry(countryId);
	}
}
