package com.service.spring.domain;

public class ShareLog {
	private String uuid;
	private int stationId;
	private String stationName;
	private String url;
	public ShareLog() {
		super();
	}
	public ShareLog(String uuid, int stationId, String stationName, String url) {
		super();
		this.uuid = uuid;
		this.stationId = stationId;
		this.stationName = stationName;
		this.url = url;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public int getStationId() {
		return stationId;
	}
	public void setStationId(int stationId) {
		this.stationId = stationId;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Override
	public String toString() {
		return "ShareLog [uuid=" + uuid + ", stationId=" + stationId + ", stationName=" + stationName + ", url=" + url
				+ "]";
	}
	
	
}
