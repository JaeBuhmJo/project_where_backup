package com.service.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.spring.domain.Criteria;
import com.service.spring.domain.Subway;
import com.service.spring.service.SubwayService;

@RestController
@RequestMapping("/subway")
public class SubwayController {
	
	@Autowired
	private SubwayService subwayService;
	
	@GetMapping("")
	public ResponseEntity<Subway> getSubway(Criteria criteria){
		System.out.println(criteria);
		Subway subway = subwayService.getNearestSubway(criteria);
		System.out.println(subway);
		
		return new ResponseEntity<>(subway, HttpStatus.OK);
	}

	@GetMapping("/{amount}")
	public ResponseEntity<List<Subway>> getSubway(Criteria criteria, @PathVariable int amount){
		criteria.setAmount(amount);
		System.out.println(criteria);
		List<Subway> subways = subwayService.getNearestSubways(criteria);
		System.out.println(subways);
		
		return new ResponseEntity<>(subways, HttpStatus.OK);
	}
}
