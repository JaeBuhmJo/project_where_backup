package com.service.spring.dao;


import java.util.List;

import com.service.spring.domain.Criteria;
import com.service.spring.domain.Subway;

public interface SubwayDAO {
	Subway getNearestSubway(Criteria criteria);
	List<Subway> getNearestSubways(Criteria criteria);
}
