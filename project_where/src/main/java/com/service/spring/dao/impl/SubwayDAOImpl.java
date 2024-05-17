package com.service.spring.dao.impl;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.service.spring.dao.SubwayDAO;
import com.service.spring.domain.Coordinate;
import com.service.spring.domain.Subway;

@Repository
public class SubwayDAOImpl implements SubwayDAO{
	
	private final static String NS = "SubwayMapper.";
	
	@Autowired
	private SqlSession sqlSession; 

	@Override
	public Subway getNearestSubway(Coordinate coordinate) {
		return sqlSession.selectOne(NS+"getNearestSubway", coordinate);
	}

}
