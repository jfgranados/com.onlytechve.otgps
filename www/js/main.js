var db = null;
var username=null;
var useruniquekey=null;
var isActivated=false;
var coordinates=null;
var deviceIMEI=null;

document.addEventListener("deviceready",main, false);              
$.mobile.defaultPageTransition='slideup'; 

function main()
{
$.ajax({
    url : "/mysite/file.html",
    success : function(result){
        alert(result);
    }
});
}