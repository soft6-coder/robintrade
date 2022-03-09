package com.soft6creators.futurespace.app.state;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StateController {
	
	@Autowired 
	private StateService stateService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/state")
	public List<State> addStates(@RequestBody List<State> states) {
		return stateService.addStates(states);
	}
	
	@RequestMapping("/state")
	public List<State> getStates() {
		return stateService.getStates();
	}
	
	@RequestMapping("/country/{countryId}/state")
	public List<State> getStateByCountry(@PathVariable int countryId) {
		return stateService.getStateByCountry(countryId);
	}

}
