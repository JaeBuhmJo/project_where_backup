package com.service.spring.service.Impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.spring.dao.SubwayDAO;
import com.service.spring.domain.Criteria;
import com.service.spring.domain.Subway;
import com.service.spring.service.SubwayService;

@Service
public class SubwayServiceImpl implements SubwayService {
	
	@Autowired
	private SubwayDAO subwayDAO;

	@Override
	public Subway getNearestSubway(Criteria criteria) {
		return subwayDAO.getNearestSubway(criteria);
	}

	@Override
	public List<Subway> getNearestSubways(Criteria criteria) {
		return subwayDAO.getNearestSubways(criteria);
	}

}
