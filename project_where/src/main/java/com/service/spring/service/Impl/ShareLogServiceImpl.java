package com.service.spring.service.Impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.spring.dao.ShareLogDAO;
import com.service.spring.domain.Rank;
import com.service.spring.domain.ShareLog;
import com.service.spring.service.ShareLogService;

@Service
public class ShareLogServiceImpl implements ShareLogService {
	
	@Autowired
	private ShareLogDAO shareLogDAO;

	@Override
	public List<Rank> getSubwayRanking() {
		return shareLogDAO.getSubwayRanking();
	}

	@Override
	public List<Rank> getBusRanking() {
		return shareLogDAO.getBusRanking();
	}

	@Override
	public String insertShareLog(ShareLog shareLog) {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		System.out.println(uuid);
		shareLog.setUuid(uuid);
		int result = shareLogDAO.insertShareLog(shareLog);
		if (result>0) {
			return uuid;
		} else {
			return "false";
		}
	}

	@Override
	public String getShareLog(String uuid) {
		return shareLogDAO.getShareLog(uuid);
	}

}
