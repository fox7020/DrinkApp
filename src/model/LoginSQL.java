package model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LoginSQL
 */
@WebServlet("/LoginSQL")
public class LoginSQL extends HttpServlet {
	private  PrintWriter out;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		out = response.getWriter();
		String account = request.getParameter("id");
		String password = request.getParameter("password");
		SQLApi api = new SQLApi();
		api.setAccount(account);
		api.setPassword(password);
		String isCorrectAccount = api.Login();
		out.print(isCorrectAccount);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}

}
