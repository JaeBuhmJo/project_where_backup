package com.service.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.Criteria;
import com.service.spring.service.BusService;

@RestController
@RequestMapping("/bus")
public class BusController {
	
	@Autowired
	private BusService busService;

	@GetMapping("")
	public ResponseEntity<BusNode> getTransport(Criteria criteria){
		System.out.println(criteria);
		BusNode busNode = busService.getNearestBusNodeWithRoutes(criteria);
		System.out.println(busNode);

		return new ResponseEntity<>(busNode, HttpStatus.OK);
	}

	@GetMapping("/{amount}")
	public ResponseEntity<List<BusNode>> getTransport(Criteria criteria, @PathVariable int amount){
		criteria.setAmount(amount);
		System.out.println(criteria);
		List<BusNode> busNodes = busService.getNearestBusNodesWithRoutes(criteria);
		System.out.println(busNodes);
		
		return new ResponseEntity<>(busNodes, HttpStatus.OK);
	}
}
