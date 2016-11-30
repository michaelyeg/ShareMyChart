import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * Created by M.Guo on 18/11/2016.
 */
public class deleteFileServlet extends HttpServlet {
    private String path;

    public void init(){
        path = getServletContext().getInitParameter("file-upload");
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
        throws ServletException, java.io.IOException{

        //File files[] = new File(path).listFiles();

        String n = request.getParameter("selected");
        String[] n1 = n.split(",");
        for (String s : n1){
            File file = new File(path+s);
            file.delete();
        }

        response.getWriter().write("delete success");
    }
}
