import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
/*
 * Created by M.Guo on 27/10/2016.
 */
public class DataServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req,
                         HttpServletResponse res)
            throws ServletException, IOException {

        List<String> results = new ArrayList<String>();
        String path = getServletContext().getInitParameter("file-upload");

        File[] files = new File(path).listFiles();

        for (File file : files){
            if (file.isFile() && file.getName().contains(".ttl")){
                results.add(file.getName());
            }
        }
        Gson gson = new Gson();
        res.getWriter().write(gson.toJson(results).toString());
    }

}