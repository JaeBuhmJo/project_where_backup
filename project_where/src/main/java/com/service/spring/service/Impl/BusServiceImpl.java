package com.service.spring.service.Impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.spring.dao.BusDAO;
import com.service.spring.domain.BusNode;
import com.service.spring.domain.Coordinate;
import com.service.spring.service.BusService;

@Service
public class BusServiceImpl implements BusService {
	
	@Autowired
	private BusDAO busDAO;

	@Override
	public BusNode getNearestBusNodeWithRoutes(Coordinate coordinate) {
		BusNode busNode = busDAO.getNearestBusNode(coordinate);
		busNode.setBusRoutes(busDAO.getBusRoutes(busNode.getNodeId()));
		return busNode;
	}

}
