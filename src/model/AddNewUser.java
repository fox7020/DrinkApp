package model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/AddNewUser")
public class AddNewUser extends HttpServlet {
	private  PrintWriter out;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		out = response.getWriter();
		SQLApi api = new SQLApi();
		String account = request.getParameter("id");
		String password = request.getParameter("password");
		String name = request.getParameter("name");
		String gender = request.getParameter("gender");
		String address = request.getParameter("address");
		String tel = request.getParameter("tel");
		api.setAccount(account);
		api.setPassword(password);
		api.setName(name);
		api.setGender(gender);
		api.setAddress(address);
		api.setTel(tel);
		
		String isInsert = api.InsertNewMember();
		out.print(isInsert);
		
	}

}
