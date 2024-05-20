package com.service.spring.service.Impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.spring.dao.BusDAO;
import com.service.spring.domain.BusNode;
import com.service.spring.domain.Criteria;
import com.service.spring.service.BusService;

@Service
public class BusServiceImpl implements BusService {
	
	@Autowired
	private BusDAO busDAO;

	@Override
	public BusNode getNearestBusNodeWithRoutes(Criteria criteria) {
		BusNode busNode = busDAO.getNearestBusNode(criteria);
		busNode.setBusRoutes(busDAO.getBusRoutes(busNode.getNodeId()));
		return busNode;
	}

	@Override
	public List<BusNode> getNearestBusNodesWithRoutes(Criteria criteria) {
		List<BusNode> busNodes = busDAO.getNearestBusNodes(criteria);
		for (BusNode busNode : busNodes) {
			busNode.setBusRoutes(busDAO.getBusRoutes(busNode.getNodeId()));
		}
		return busNodes;
	}

}
