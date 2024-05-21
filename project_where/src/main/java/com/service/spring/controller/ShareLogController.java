package com.service.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.spring.domain.Rank;
import com.service.spring.domain.ShareLog;
import com.service.spring.service.ShareLogService;

@RestController
@RequestMapping("/sharelog")
public class ShareLogController {
	
	@Autowired
	private ShareLogService shareLogService;
	
	@GetMapping("/bus")
	public ResponseEntity<List<Rank>> getBusRanking(){
		List<Rank> busRanking = shareLogService.getBusRanking();
		System.out.println(busRanking);
		return new ResponseEntity<>(busRanking, HttpStatus.OK);
	}
	
	@GetMapping("/subway")
	public ResponseEntity<List<Rank>> getSubwayRanking(){
		List<Rank> subwayRanking = shareLogService.getSubwayRanking();
		System.out.println(subwayRanking);
		return new ResponseEntity<>(subwayRanking, HttpStatus.OK);
	}
	
	@GetMapping("/{uuid}")
	public ResponseEntity<String> getShareLog(@PathVariable String uuid) {
		String url = shareLogService.getShareLog(uuid);
		System.out.println("getShareLog : "+url);
		return new ResponseEntity<>(url, HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<String> postShareLog(ShareLog shareLog){
		System.out.println(shareLog);
		String result = shareLogService.insertShareLog(shareLog);
		if (result.equals("false")) {
			return new ResponseEntity<>("false", HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
	}
}
