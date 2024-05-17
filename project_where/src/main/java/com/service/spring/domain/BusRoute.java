package com.service.spring.domain;

public class BusRoute {
	private int nodeId;
	private int routeId;
	private String routeName;
	public BusRoute(int nodeId, int routeId, String routeName) {
		super();
		this.nodeId = nodeId;
		this.routeId = routeId;
		this.routeName = routeName;
	}
	public BusRoute() {
		super();
	}
	public int getNodeId() {
		return nodeId;
	}
	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}
	public int getRouteId() {
		return routeId;
	}
	public void setRouteId(int routeId) {
		this.routeId = routeId;
	}
	public String getRouteName() {
		return routeName;
	}
	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}
	@Override
	public String toString() {
		return "BusRoute [nodeId=" + nodeId + ", routeId=" + routeId + ", routeName=" + routeName + "]";
	}
	
	
}
