package com.service.spring.domain;

public class Criteria {
	private double latitude;
	private double longitude;
	private int amount;
	public Criteria() {
		super();
	}
	public Criteria(double latitude, double longitude) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public Criteria(double latitude, double longitude, int amount) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.amount = amount;
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
	
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return "Criteria [latitude=" + latitude + ", longitude=" + longitude + ", amount=" + amount + "]";
	}
	
}
