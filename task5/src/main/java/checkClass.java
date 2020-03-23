import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class checkClass extends HttpServlet{


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter writer = response.getWriter();



        try {
            String dataToReturn = "{\"sucesss\" : true}";
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            writer.print(dataToReturn);
        } finally {
            writer.close();
        }
    }
}
