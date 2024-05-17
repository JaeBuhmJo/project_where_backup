package com.service.spring.service;

import com.service.spring.domain.Coordinate;
import com.service.spring.domain.Subway;

public interface SubwayService {
	Subway getNearestSubway(Coordinate coordinate);
}
