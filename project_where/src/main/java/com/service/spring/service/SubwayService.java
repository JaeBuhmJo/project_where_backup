package com.service.spring.service;

import java.util.List;

import com.service.spring.domain.Criteria;
import com.service.spring.domain.Subway;

public interface SubwayService {
	Subway getNearestSubway(Criteria criteria);
	List<Subway> getNearestSubways(Criteria criteria);
}
