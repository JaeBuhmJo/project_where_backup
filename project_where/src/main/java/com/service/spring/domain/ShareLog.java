package com.service.spring.domain;

public class ShareLog {
	private int nodeId;
	private String nodeName;
	private int stationId;
	private String stationName;
	public ShareLog() {
		super();
	}
	public ShareLog(int nodeId, String nodeName, int stationId, String stationName) {
		super();
		this.nodeId = nodeId;
		this.nodeName = nodeName;
		this.stationId = stationId;
		this.stationName = stationName;
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
	@Override
	public String toString() {
		return "ShareLog [nodeId=" + nodeId + ", nodeName=" + nodeName + ", stationId=" + stationId + ", stationName="
				+ stationName + "]";
	}
	
	
}
