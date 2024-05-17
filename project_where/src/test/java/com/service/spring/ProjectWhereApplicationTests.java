package com.service.spring;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.service.spring.domain.BusNode;
import com.service.spring.domain.BusRoute;
import com.service.spring.domain.Coordinate;
import com.service.spring.domain.ShareLog;
import com.service.spring.domain.Subway;

@SpringBootTest
class ProjectWhereApplicationTests {

//	@Test
//	void busTest() throws IOException {
//		Reader r = Resources.getResourceAsReader("config/SqlMapConfig.xml");
//		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(r);
//		SqlSession session = factory.openSession();
//		double latitude = 16.542;
//		double longitude = 8.4245;
//
//		BusNode busNode = session.selectOne("BusMapper.getNearestBusNode", new Coordinate(latitude, longitude));
//		System.out.println(busNode);
//		busNode.setBusRoutes(session.selectList("BusMapper.getBusRoutes", busNode.getNodeId()));
//		System.out.print(busNode.getNodeName()+" 정류장에는 ");
//		for (BusRoute route : busNode.getBusRoutes()) {
//			System.out.print(route.getRouteName()+", ");
//		}
//		System.out.println("번 버스가 다닙니다.");
//	}
//	
//	@Test
//	void subwayTest() throws IOException{
//		Reader r = Resources.getResourceAsReader("config/SqlMapConfig.xml");
//		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(r);
//		SqlSession session = factory.openSession();
//		double latitude = 126.542;
//		double longitude = 38.4245;
//		Subway subway = session.selectOne("SubwayMapper.getNearestSubway", new Coordinate(latitude, longitude));
//		System.out.println(subway);
//	}
	
	@Test
	void ShareLogTest() throws IOException{
		Reader r = Resources.getResourceAsReader("config/SqlMapConfig.xml");
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(r);
		SqlSession session = factory.openSession();
		
		System.out.println("버스 로그 가져오기");
		System.out.println(session.selectList("ShareLogMapper.getBusRanking"));
		
		System.out.println("지하철 로그 가져오기");
		System.out.println(session.selectList("ShareLogMapper.getSubwayRanking"));
		
		System.out.println("로그 기록하기");
		System.out.println(session.insert("ShareLogMapper.insertShareLog", new ShareLog(100000004, "종로2가.삼일교", 201, "시청")));
	}

}
