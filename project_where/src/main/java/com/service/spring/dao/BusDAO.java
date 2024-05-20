package com.service.spring.dao;


import java.util.List;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.BusRoute;
import com.service.spring.domain.Criteria;

public interface BusDAO {
	BusNode getNearestBusNode(Criteria criteria);
	List<BusNode> getNearestBusNodes(Criteria criteria);
	List<BusRoute> getBusRoutes(int nodeId);
}
