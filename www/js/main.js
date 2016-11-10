var db = null;
var username=null;
var useruniquekey=null;
var isActivated=false;
var coordinates=null;
var deviceIMEI=null;
var numero_de_gps=null;
var serial_de_acti=null;
var database_ready=false;
document.addEventListener("deviceready",main, false);              
$.mobile.defaultPageTransition='slide'; 

function main()
{
   var db = window.sqlitePlugin.openDatabase({name: "com.onlytechve.GPS.db"});

}


function register()
{
    serial_de_acti=document.getElementById("ikey").value;
    numero_de_gps=document.getElementById("inumber").value
    if (($.isNumeric(numero_de_gps))& (serial_de_acti.length>0))
        {
            $.ajax({
            url : "http://app.carabobotrackers.com.ve/chekkey.php?key="+serial_de_acti+" &gpsnum="+numero_de_gps,
            success : function(result){
            
                    switch (result){
                        case "0":
                            $(":mobile-pagecontainer").pagecontainer( "change", $("#welcome" ));
                            break;
                        case "1":
                            alert("No se pudo conectar con la base de datos");
                            break;
                        case "2":
                            alert("la clave introducida es invalida");
                            break;
                        case "3":
                            alert("Ya existe un dispositivo registrado con esa clave");
                            break;
                    }

    }});
        }
        else{alert("verifique los datos ingresados");}
}