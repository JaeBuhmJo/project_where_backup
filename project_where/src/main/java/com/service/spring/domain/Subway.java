package com.service.spring.domain;

public class Subway {
	private int stationId;
	private String stationName;
	private String line;
	private double latitude;
	private double longitude;
	public Subway(int stationId, String stationName, String line, double latitude, double longitude) {
		super();
		this.stationId = stationId;
		this.stationName = stationName;
		this.line = line;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public Subway() {
		super();
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
	public String getLine() {
		return line;
	}
	public void setLine(String line) {
		this.line = line;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	@Override
	public String toString() {
		return "Subway [stationId=" + stationId + ", stationName=" + stationName + ", line=" + line + ", latitude="
				+ latitude + ", longitude=" + longitude + "]";
	}
	
	
}
