import com.meterware.httpunit.PostMethodWebRequest;
import com.meterware.httpunit.WebRequest;
import com.meterware.httpunit.WebResponse;
import com.meterware.servletunit.InvocationContext;
import com.meterware.servletunit.ServletRunner;
import com.meterware.servletunit.ServletUnitClient;
import org.junit.Test;

import java.io.File;
import java.io.IOException;

/*
import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertNotNull;
*/

/**
 * Created by M.Guo on 02/11/2016.
 */
/*
public class DataServletTest {

    @Test
    public void getTest() throws IOException {
        int num;
        File files[] = new  File("/Users/Margaret/Documents/workspace/ShareMyChart/data").listFiles();
        num = files.length;
        File file = new File("/Users/Margaret/Documents/workspace/ShareMyChart/data/test.ttl");
        try {
            if (file.createNewFile()){
                System.out.println("created");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        ServletRunner servletRunner = new ServletRunner();
        servletRunner.registerServlet("DataServlet", DataServlet.class.getName());

        ServletUnitClient servletUnitClient = servletRunner.newClient();
        WebRequest webRequest = new PostMethodWebRequest("http://localhost:8080/DataServlet");
        InvocationContext invocationContext = servletUnitClient.newInvocation(webRequest);

        WebResponse webResponse = invocationContext.getServletResponse();

        assertNotNull( "No response received", webResponse );
        assertEquals( "content type", "text/plain", webResponse.getContentType() );

        assertEquals(num,webResponse.getResponseMessage().length());

        file.delete();

    }


}
*/