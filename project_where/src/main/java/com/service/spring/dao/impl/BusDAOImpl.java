package com.service.spring.dao.impl;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.service.spring.dao.BusDAO;
import com.service.spring.domain.BusNode;
import com.service.spring.domain.BusRoute;
import com.service.spring.domain.Criteria;

@Repository
public class BusDAOImpl implements BusDAO{
	
	private final static String NS = "BusMapper.";
	
	@Autowired
	private SqlSession sqlSession; 

	@Override
	public BusNode getNearestBusNode(Criteria criteria) {
		return sqlSession.selectOne(NS+"getNearestBusNode", criteria);
	}

	@Override
	public List<BusRoute> getBusRoutes(int nodeId) {
		return sqlSession.selectList(NS+"getBusRoutes", nodeId);
	}

	@Override
	public List<BusNode> getNearestBusNodes(Criteria criteria) {
		
		return sqlSession.selectList(NS+"getNearestBusNodes", criteria);
	}

}
