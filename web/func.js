/**
 * Created by M.Guo on 21/10/2016.
 */

/**
 * file button clicking
 */

$('#my-button').click(function(){
    $('#my-file').click();
});


/**
 * tab clicking
 */
$('li > a').click(function() {
        $('li').removeClass();
        $(this).parent().addClass('active');
});

/**
 * change tab
 * @param evt
 * @param Name
 * http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs_open
 */

function openCity(evt, Name) {

    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(Name).style.display = "block";
    // Get the element with id="defaultOpen" and click on it

}
document.getElementById("defaultOpen").click();

/**
 * submit form with ajax
 */
$(document).ready(function(){
    $("#form-submit").ajaxForm({
        type:"post",
        url:"UploadServlet",
        success:function(data){
            console.log(data);
            refreshData();
        },
        error:function(XmlHttpRequest,textStatus,errorThrown){
            console.log(XmlHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    refreshData();
});

/**
 * refresh the list of files
 */
function refreshData(){
   $.ajax({
       url:"/data",
       dataType:"json",
       success:function (data) {
           console.log(data);
           var _html = "<ul>";
           $.each(data, function (key,value) {
               _html += "<li><a href='javascript:void(0);' onclick='load(this)' data-filename='"+value+"'> "+ value +" </a></li>";
               //$("#list").append("<li> <a id="+value+" href='javascript:void(0);' onclick='load(this.parentNode.getAttribute(id))'>"+value+"</a></li>");
           });
           $("#list").html(_html);
       }
   });
};



function getContextPath() {
    var contextPath =window.location.protocol + "//"  + window.location.host + "" + window.location.pathname;
    console.log(contextPath);
}

function load(value){
    //var path = "/Users/Margaret/Documents/workspace/ShareMyChart/data/" + $(value).data("filename");
    var path = window.location.protocol + "//"  + window.location.host +"/" + "data/" + $(value).data("filename");
    // $.get(path,null,function(content){
    //     console.log(content);
    // },'text');
    console.log(path);

    var new_Store = new GraphStore(path);


}
