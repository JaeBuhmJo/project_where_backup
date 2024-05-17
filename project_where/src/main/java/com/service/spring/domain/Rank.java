package com.service.spring.domain;

public class Rank {
	private String name;
	private int count;
	public Rank(String name, int count) {
		super();
		this.name = name;
		this.count = count;
	}
	public Rank() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "Rank [name=" + name + ", count=" + count + "]";
	}
	
	
}
