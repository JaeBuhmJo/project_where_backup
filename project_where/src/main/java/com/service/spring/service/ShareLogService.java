package com.service.spring.service;

import java.util.List;

import com.service.spring.domain.Rank;
import com.service.spring.domain.ShareLog;

public interface ShareLogService {
	List<Rank> getSubwayRanking();
	List<Rank> getBusRanking();
	String insertShareLog(ShareLog shareLog);
	String getShareLog(String uuid);
}
