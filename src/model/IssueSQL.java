package model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/IssueSQL")
public class IssueSQL extends HttpServlet {
	
	private  PrintWriter out;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		out = response.getWriter();
		SQLApi api = new SQLApi();
		String account = request.getParameter("id");
		String tel = request.getParameter("tel");
		String content = request.getParameter("content");
		api.setAccount(account);
		api.setTel(tel);
		String isInsertIssue = api.insertIssue(content);
		out.println(isInsertIssue);
	}

}
