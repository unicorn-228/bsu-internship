import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class getClass extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String name = request.getParameter("name");

        ServletOutputStream out = response.getOutputStream();

        out.println("<html>");
        out.println("<head><title>Hello Servlet</title></head>");

        out.println("<body>");
        out.println("<h3>name = " + name + "</h3>");
        out.println("</body>");
        out.println("<html>");
    }
}
