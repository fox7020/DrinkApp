package model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/EditMemberSQL")
public class EditMemberSQL extends HttpServlet {
	private  PrintWriter out;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		out = response.getWriter();
		SQLApi api = new SQLApi();
		String account = request.getParameter("id");
		String memberData  = api.getMemberData(account);
		out.println(memberData);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		out = response.getWriter();
		SQLApi api = new SQLApi();
		String account = request.getParameter("id");
		String name = request.getParameter("name");
		String gender = request.getParameter("gender");
		String address = request.getParameter("address");
		String tel = request.getParameter("tel");
		String password = request.getParameter("password");
		api.setName(name);
		api.setGender(gender);
		api.setAddress(address);
		api.setTel(tel);		
		String isUpdate = "";
		if(password == null){
			isUpdate = api.UpdateMemberDataWithoutPassword(account);
		}
		else{
			api.setPassword(password);
			isUpdate = api.UpdateMemberDataWithPassword(account);
		}
		out.println(isUpdate);
	}

}
