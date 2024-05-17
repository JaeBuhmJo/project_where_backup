package com.service.spring.service.Impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.spring.dao.SubwayDAO;
import com.service.spring.domain.Coordinate;
import com.service.spring.domain.Subway;
import com.service.spring.service.SubwayService;

@Service
public class SubwayServiceImpl implements SubwayService {
	
	@Autowired
	private SubwayDAO subwayDAO;

	@Override
	public Subway getNearestSubway(Coordinate coordinate) {
		return subwayDAO.getNearestSubway(coordinate);
	}

}
