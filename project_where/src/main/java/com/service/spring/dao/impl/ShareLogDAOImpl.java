package com.service.spring.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.service.spring.dao.ShareLogDAO;
import com.service.spring.domain.Rank;
import com.service.spring.domain.ShareLog;

@Repository
public class ShareLogDAOImpl implements ShareLogDAO {
	
	private final static String NS = "ShareLogMapper.";
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<Rank> getSubwayRanking() {
		return sqlSession.selectList(NS+"getSubwayRanking");
	}

	@Override
	public List<Rank> getBusRanking() {
		return sqlSession.selectList(NS+"getBusRanking");
	}

	@Override
	public int insertShareLog(ShareLog shareLog) {
		return sqlSession.insert(NS+"insertShareLog", shareLog);
	}

	@Override
	public String getShareLog(String uuid) {
		return sqlSession.selectOne(NS+"getShareLog", uuid);
	}

}
