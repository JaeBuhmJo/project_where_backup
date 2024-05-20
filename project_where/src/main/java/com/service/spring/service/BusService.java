package com.service.spring.service;


import java.util.List;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.Criteria;

public interface BusService {
	BusNode getNearestBusNodeWithRoutes(Criteria criteria);
	List<BusNode> getNearestBusNodesWithRoutes(Criteria criteria);
}
