package com.service.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.Coordinate;
import com.service.spring.service.BusService;

@RestController
@RequestMapping("/bus")
public class BusController {
	
	@Autowired
	private BusService busService;

	@GetMapping("")
	public ResponseEntity<BusNode> getTransport(Coordinate coordinate){
		System.out.println(coordinate);
		BusNode busNode = busService.getNearestBusNodeWithRoutes(coordinate);
		System.out.println(busNode);

		return new ResponseEntity<>(busNode, HttpStatus.OK);
	}
}
