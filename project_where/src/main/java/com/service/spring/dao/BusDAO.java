package com.service.spring.dao;


import java.util.List;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.BusRoute;
import com.service.spring.domain.Coordinate;

public interface BusDAO {
	BusNode getNearestBusNode(Coordinate coordinate);
	List<BusRoute> getBusRoutes(int nodeId);
}
