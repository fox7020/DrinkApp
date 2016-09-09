package model;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;




public class SQLApi {
	
	public Connection con;
	private PreparedStatement pstmt;
	public SQLApi(){
		
	}
	
	private String account;
	private String password;
	private String name;
	private String address;
	private String tel;
	private String gender;
	
	
	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getAccount() {
		return account;
	}


	public void setAccount(String account) {
		this.account = account;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getTel() {
		return tel;
	}


	public void setTel(String tel) {
		this.tel = tel;
	}


	public void setDBProp() {
		
		try {
			Properties prop = new Properties();
			prop.setProperty("user", "root");
			prop.setProperty("password", "");
			prop.setProperty("characterEncoding", "UTF-8");
			prop.setProperty("useUnicode", "true");
			prop.setProperty("useSSL", "False");
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost/erp", prop);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	protected String isUniqueId(String id){
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("SELECT customerId FROM member WHERE customerId = ?");
			pstmt.setString(1,id);
			ResultSet rs = pstmt.executeQuery();
			JSONArray all = new JSONArray();
			JSONObject jsonRow = new JSONObject();
			if(rs.next()) {	
				
				jsonRow.put("unique", "false");
			}
			else{
				jsonRow.put("unique", "true");
				
			}
			all.put(jsonRow);
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String InsertNewMember(){
		setDBProp();
		int isInsert=0;
		String data = "";
		try{
			pstmt = con.prepareStatement("INSERT INTO member(customerId, password, memberName, tel,address,gender) VALUES (?,?,?,?,?,?)");
			pstmt.setString(1,account);
			pstmt.setString(2,password);
			pstmt.setString(3,name);
			pstmt.setString(4,tel);
			pstmt.setString(5,address);
			pstmt.setString(6,gender);
			isInsert = pstmt.executeUpdate();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		JSONArray all = new JSONArray();
		JSONObject jsonRow = new JSONObject();
		if(isInsert==1){
			try {
				jsonRow.put("InsertNewUser", "true");
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		else{
			try {
				jsonRow.put("InsertNewUser", "false");
			} catch (JSONException e) {	
				e.printStackTrace();
			}
		}
		all.put(jsonRow);
		data = all.toString();
		return data;
	}
	
	protected String Login(){
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("SELECT customerId FROM member WHERE customerId = ? AND password = ?");
			pstmt.setString(1,account);
			pstmt.setString(2,password);
			ResultSet rs = pstmt.executeQuery();
			JSONArray all = new JSONArray();
			JSONObject jsonRow = new JSONObject();
			if(rs.next()) {	
				
				jsonRow.put("correctAccount", "true");
			}
			else{
				jsonRow.put("correctAccount", "false");
				
			}
			all.put(jsonRow);
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String getOrderData(String account) {
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("SELECT orderitem.productNum,product.productName,qty, orderNum FROM orderitem ,product WHERE orderNum IN (SELECT orderNum FROM orderlist WHERE customerid = ?) AND orderitem.productNum = (product.productNum)");
			pstmt.setString(1,account);
			ResultSet rs = pstmt.executeQuery();
			JSONArray all = new JSONArray();
			
			while(rs.next()) {
				JSONObject jsonRow = new JSONObject();
				String[] row = new String[4];
				row[0] = rs.getString("productNum");
				row[1] = rs.getString("productName");
				row[2] = rs.getString("qty");
				row[3] = rs.getString("orderNum");
				jsonRow.put("productNum", row[0]);
				jsonRow.put("productName", row[1]);
				jsonRow.put("qty", row[2]);
				jsonRow.put("orderNum", row[3]);
				all.put(jsonRow);
			}
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String getUserName(String account){
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("SELECT memberName FROM member WHERE customerId = ?");
			pstmt.setString(1,account);
			ResultSet rs = pstmt.executeQuery();
			JSONArray all = new JSONArray();
			
			while(rs.next()) {
				JSONObject jsonRow = new JSONObject();
				String name = rs.getString("memberName");
				jsonRow.put("memberName", name);
				all.put(jsonRow);
			}
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String getMemberData(String account) {
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("SELECT memberName,tel,gender,address FROM member WHERE customerId = ?");
			pstmt.setString(1,account);
			ResultSet rs = pstmt.executeQuery();
			JSONArray all = new JSONArray();
			
			while(rs.next()) {
				JSONObject jsonRow = new JSONObject();
				String[]row = new String[4];
				row[0] = rs.getString("memberName");
				row[1] = rs.getString("tel");
				row[2] = rs.getString("address");
				row[3] = rs.getString("gender");
				jsonRow.put("memberName", row[0]);
				jsonRow.put("tel", row[1]);
				jsonRow.put("address", row[2]);
				jsonRow.put("gender", row[3]);
				all.put(jsonRow);
			}
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String  UpdateMemberDataWithPassword(String account) {
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("UPDATE member SET memberName = ?, tel = ?, gender = ?, address = ? ,password = ? WHERE customerId = ?");
			pstmt.setString(1,name);
			pstmt.setString(2,tel);
			pstmt.setString(3,gender);
			pstmt.setString(4,address);
			pstmt.setString(5,password);
			pstmt.setString(6,account);
			int isUpdate = pstmt.executeUpdate();
			JSONArray all = new JSONArray();
			JSONObject jsonRow = new JSONObject();
			if(isUpdate == 1){
				jsonRow.put("UpdateMemberData", "true");
			}
			else{
				jsonRow.put("UpdateMemberData", "false");
			}
			all.put(jsonRow);
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String UpdateMemberDataWithoutPassword(String account){
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("UPDATE member SET memberName = ?, tel = ?, gender = ?, address = ? WHERE customerId = ?");
			pstmt.setString(1,name);
			pstmt.setString(2,tel);
			pstmt.setString(3,gender);
			pstmt.setString(4,address);
			pstmt.setString(5,account);
			int isUpdate = pstmt.executeUpdate();
			JSONArray all = new JSONArray();
			JSONObject jsonRow = new JSONObject();
			if(isUpdate == 1){
				jsonRow.put("UpdateMemberData", "true");
			}
			else{
				jsonRow.put("UpdateMemberData", "false");
			}
			all.put(jsonRow);
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String checkPassword(String password){
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("SELECT customerId FROM member WHERE customerId = ? AND password = ?");
			pstmt.setString(1,account);
			pstmt.setString(2,password);
			ResultSet rs = pstmt.executeQuery();
			JSONArray all = new JSONArray();
			JSONObject jsonRow = new JSONObject();
			if(rs.next()){
				jsonRow.put("isCorrectPassword", "true");
			}
			else{
				jsonRow.put("isCorrectPassword", "false");
			}
			all.put(jsonRow);
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}
	
	protected String insertIssue(String content){
		setDBProp();
		String data = "";
		try{
			pstmt = con.prepareStatement("INSERT INTO issue(customerId,complaint,tel)VALUES(?,?,?)");
			pstmt.setString(1,account);
			pstmt.setString(2,content);
			pstmt.setString(3,tel);
			int isInsert = pstmt.executeUpdate();
			JSONArray all = new JSONArray();
			JSONObject jsonRow = new JSONObject();
			if(isInsert == 1){
				jsonRow.put("isInsertIssue", "true");
			}
			else{
				jsonRow.put("isInsertIssue", "false");
			}
			all.put(jsonRow);
			data = all.toString();
		}
		catch(Exception ee){
			System.out.println(ee.toString());
		}
		return data;
	}

}
