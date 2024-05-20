package com.service.spring.dao.impl;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.service.spring.dao.SubwayDAO;
import com.service.spring.domain.Criteria;
import com.service.spring.domain.Subway;

@Repository
public class SubwayDAOImpl implements SubwayDAO{
	
	private final static String NS = "SubwayMapper.";
	
	@Autowired
	private SqlSession sqlSession; 

	@Override
	public Subway getNearestSubway(Criteria criteria) {
		return sqlSession.selectOne(NS+"getNearestSubway", criteria);
	}

	@Override
	public List<Subway> getNearestSubways(Criteria criteria) {
		return sqlSession.selectList(NS+"getNearestSubways", criteria);
	}

}
