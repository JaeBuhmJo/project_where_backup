package com.service.spring.service;


import com.service.spring.domain.BusNode;
import com.service.spring.domain.Coordinate;

public interface BusService {
	BusNode getNearestBusNodeWithRoutes(Coordinate coordinate);
}
