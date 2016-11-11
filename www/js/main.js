var db = null;
var traccar_username=null;
var traccar_password=null;
var useruniquekey=null;
var isActivated=false;
var coordinates=null;
var deviceIMEI=null;
var numero_de_gps=null;
var serial_de_acti=null;
var database_ready=false;
var userpass="123456";
var traccar_enabled=false;
document.addEventListener("deviceready",main, false);              
$.mobile.defaultPageTransition='slide'; 
$.support.cors = true;

function main()
{
    /*-- Coordova finalmente cargo , dispositivo listo para usarse*/ 
    numero_de_gps=window.localStorage.getItem("numero_de_gps");
    if(numero_de_gps.length>5)
    {
        /*-- Existe un gps registrado, cargamos la configuracion y damos el control a la pagina principal**/
        isActivated=true;
        serial_de_acti=window.localStorage.getItem("serial_de_acti");
        userpass=window.localStorage.getItem("userpass");
        traccar_enabled=(window.localStorage.getItem("traccar_enabled")=="true");
            if(traccar_enabled)
                {
                    traccar_username=window.localStorage.getItem("traccar_username");
                    traccar_password=window.localStorage.getItem("traccar_password");
                    deviceIMEI=window.localStorage.getItem("deviceIMEI");

                }
        /*Cargados los datos de configuracion en las variables locales, listas para usarsem 
        cedemos el control al formulario principal*/
         $(":mobile-pagecontainer").pagecontainer( "change", $("#welcome" ));
    } 
    /* si no existe el registro, avanzamos directo a la pagina de registro*/
    $(":mobile-pagecontainer").pagecontainer( "change", $("#firstime" )); 
    
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
                           window.localStorage.setItem("numero_de_gps",numero_de_gps);
                           window.localStorage.setItem("serial_de_acti",serial_de_acti);
                           window.localStorage.setItem("isActivated","true") ;                       
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
function doMenu(val)
{
    var smsstring=null;

    switch (val) {
        case 0:
            smsstring="stop"+userpass;
            send_command(smstring);
            break;
        case 1:
            smsstring="start"+userpass;
            break;
        case 2:
            if(!traccar_enabled)
            {
                alert("Debe configurar el servicio web antes de usar esta opcion");
                $(":mobile-pagecontainer").pagecontainer("change","#showGPS");
            }
            break; 
        case 3:
            
            break;
        case 4:
            
            break;
        case 5:
            
            break;        
    
        default:
            break;
    }
}

    