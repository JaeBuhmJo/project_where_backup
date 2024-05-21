package com.service.spring.dao;

import java.util.List;

import com.service.spring.domain.Rank;
import com.service.spring.domain.ShareLog;

public interface ShareLogDAO {
	List<Rank> getSubwayRanking();
	List<Rank> getBusRanking();
	int insertShareLog(ShareLog shareLog);
	String getShareLog(String uuid);
}
