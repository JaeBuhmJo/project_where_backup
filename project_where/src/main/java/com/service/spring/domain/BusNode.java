package com.service.spring.domain;

import java.util.List;

public class BusNode {
	private int nodeId;
	private String nodeName;
	private double latitude;
	private double longitude;
	private List<BusRoute> busRoutes;
	public BusNode() {
		super();
	}
	public BusNode(int nodeId, String nodeName, double latitude, double longitude, List<BusRoute> busRoutes) {
		super();
		this.nodeId = nodeId;
		this.nodeName = nodeName;
		this.latitude = latitude;
		this.longitude = longitude;
		this.busRoutes = busRoutes;
	}
	public int getNodeId() {
		return nodeId;
	}
	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}
	public String getNodeName() {
		return nodeName;
	}
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
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
	public List<BusRoute> getBusRoutes() {
		return busRoutes;
	}
	public void setBusRoutes(List<BusRoute> busRoutes) {
		this.busRoutes = busRoutes;
	}
	@Override
	public String toString() {
		return "BusNode [nodeId=" + nodeId + ", nodeName=" + nodeName + ", latitude=" + latitude + ", longitude="
				+ longitude + ", busRoutes=" + busRoutes + "]";
	}
	
	
	
}
