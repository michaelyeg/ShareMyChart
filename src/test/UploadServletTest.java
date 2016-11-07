import com.meterware.httpunit.*;
import com.meterware.httpunit.protocol.UploadFileSpec;
import com.meterware.servletunit.ServletRunner;
import org.junit.Test;
import org.xml.sax.SAXException;

import java.io.File;
import java.io.IOException;

/**
 * Created by M.Guo on 03/11/2016.
 */

/*
public class UploadServletTest {

    @Test
    public void postTest() throws IOException, SAXException {

        File files[] = new File("/Users/Margaret/Documents/workspace/ShareMyChart/data").listFiles();
        File file = new File("/Users/Margaret/Documents/workspace/ShareMyChart/test1.ttl");
        try {
            if (file.createNewFile()){
                System.out.println("created");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        int num = files.length+1;

        ServletRunner servletRunner = new ServletRunner();
        servletRunner.registerServlet("UploadServlet",UploadServlet.class.getName());

        WebConversation conversation = new WebConversation();
        WebRequest request = new GetMethodWebRequest("http://localhost:8080/main.html");
        WebResponse response = conversation.getResponse(request);

        WebForm form = response.getFormWithID("form-submit");

        UploadFileSpec uploadFileSpec = new UploadFileSpec(file,"test.ttl");
        form.setParameter("file", new UploadFileSpec[] {uploadFileSpec});

    }
}
*/