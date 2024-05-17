package com.service.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.spring.domain.Coordinate;
import com.service.spring.domain.Subway;
import com.service.spring.service.SubwayService;

@RestController
@RequestMapping("/subway")
public class SubwayController {
	
	@Autowired
	private SubwayService subwayService;
	
	@GetMapping("")
	public ResponseEntity<Subway> getSubway(Coordinate coordinate){
		System.out.println(coordinate);
		Subway subway = subwayService.getNearestSubway(coordinate);
		System.out.println(subway);
		
		return new ResponseEntity<>(subway, HttpStatus.OK);
	}
}
