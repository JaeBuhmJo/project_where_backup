package com.service.spring.dao;


import com.service.spring.domain.Coordinate;
import com.service.spring.domain.Subway;

public interface SubwayDAO {
	Subway getNearestSubway(Coordinate coordinate);
}
