package com.service.spring;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.BusRoute;
import com.service.spring.domain.Criteria;
import com.service.spring.domain.ShareLog;
import com.service.spring.domain.Subway;

@SpringBootTest
class ProjectWhereApplicationTests {

	@Test
	void busTest() throws IOException {
		System.out.println();
		System.out.println("====================busTest start=====================");
		Reader r = Resources.getResourceAsReader("config/SqlMapConfig.xml");
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(r);
		SqlSession session = factory.openSession();
		double latitude = 16.542;
		double longitude = 8.4245;

		System.out.println("1. 가장 가까운 버스정류장 하나 가져오기");
		BusNode busNode = session.selectOne("BusMapper.getNearestBusNode", new Criteria(latitude, longitude));
		System.out.println(busNode);
		busNode.setBusRoutes(session.selectList("BusMapper.getBusRoutes", busNode.getNodeId()));
		System.out.print(busNode.getNodeName()+" 정류장에는 ");
		for (BusRoute route : busNode.getBusRoutes()) {
			System.out.print(route.getRouteName()+", ");
		}
		System.out.println("번 버스가 다닙니다.");
		
		int amount = 3;
		System.out.println("2. 가장 가까운 버스정류장 "+amount+"개 가져오기");
		List<BusNode> busNodes = session.selectList("BusMapper.getNearestBusNodes", new Criteria(latitude, longitude, amount));
		for (int i = 0; i < busNodes.size(); i++) {
			busNodes.get(i).setBusRoutes(session.selectList("BusMapper.getBusRoutes", busNodes.get(i).getNodeId()));
			System.out.println(i+1 + busNodes.get(i).toString());
			System.out.print(busNode.getNodeName()+" 정류장에는 ");
			for (BusRoute route : busNode.getBusRoutes()) {
				System.out.print(route.getRouteName()+", ");
			}
			System.out.println("번 버스가 다닙니다.");
		}
	}
	
	@Test
	void subwayTest() throws IOException{
		System.out.println();
		System.out.println("====================subwayTest start=====================");
		Reader r = Resources.getResourceAsReader("config/SqlMapConfig.xml");
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(r);
		SqlSession session = factory.openSession();
		double latitude = 126.542;
		double longitude = 38.4245;
		System.out.println("1. 가장 가까운 지하철역 하나 가져오기");
		Subway subway = session.selectOne("SubwayMapper.getNearestSubway", new Criteria(latitude, longitude));
		System.out.println(subway);

		int amount = 3;
		System.out.println("2. 가장 가까운 지하철역 "+amount+"개 가져오기");
		List<Subway> subways = session.selectList("SubwayMapper.getNearestSubways", new Criteria(latitude, longitude, amount));
		for (int i = 0; i < subways.size(); i++) {
			System.out.println(i+1 + subways.get(i).toString());
		}
	}
	
	@Test
	void ShareLogTest() throws IOException{
		System.out.println();
		System.out.println("====================sharelogTest start=====================");
		Reader r = Resources.getResourceAsReader("config/SqlMapConfig.xml");
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(r);
		SqlSession session = factory.openSession();

		System.out.println("버스 로그 : " + session.selectList("ShareLogMapper.getBusRanking"));
		System.out.println("지하철 로그 : "+session.selectList("ShareLogMapper.getSubwayRanking"));
		
		System.out.println("로그 기록하기 : 기록한 수 : "+session.insert("ShareLogMapper.insertShareLog", new ShareLog(100000004, "종로2가.삼일교", 201, "시청")));

		System.out.println("버스 로그 : " + session.selectList("ShareLogMapper.getBusRanking"));
		System.out.println("지하철 로그 : " + session.selectList("ShareLogMapper.getSubwayRanking"));
		
	}

}
