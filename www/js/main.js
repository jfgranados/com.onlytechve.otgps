var db = null;
var traccar_username=null;
var traccar_password=null;
var traccar_userID=null;
var traccar_server="http://198.50.252.246:8082";
var web_app_server="198.50.252.246";
var isActivated=false;
var coordinates=null;
var deviceIMEI=null;
var numero_de_gps=null;
var serial_de_acti=null;
var database_ready=false;
var userpass="123456";
var traccar_enabled=false;
var traccar_session=null;
var smsplugin=null;
var map;
var traccar_devices=null;
var traccar_lastest_postitions=null;
function initMap()
{
     map = new google.maps.Map(document.getElementById('map'), {
                 center: {lat: -34.397, lng: 150.644},
                 scrollwheel: false,
                 zoom: 14
        });
}
document.addEventListener("deviceready",main, false);   
document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#welcome')){
        /* 
         Event preventDefault/stopPropagation not required as adding backbutton
          listener itself override the default behaviour. Refer below PhoneGap link.
        */
        //e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory()
    }
}, false);           
$.mobile.defaultPageTransition='slide'; 
$.support.cors = true;
var $loading = $('#loadingDiv').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
$(document).ready(function ()
{

/* Seleccionar la pagina correcta a trabajar*/
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if (!isAndroid){
                // Create a map object and specify the DOM element for display.
                
      
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
         return true;
    } 
    /* si no existe el registro, avanzamos directo a la pagina de registro*/
    $(":mobile-pagecontainer").pagecontainer( "change", $("#firstime" ));
    return false; 
}   
});
function main()
{
    /*-- Coordova finalmente cargo , dispositivo listo para usarse*/ 
    /*-- activar el plugin de SMS --*/

                // Create a map object and specify the DOM element for display.
              
   
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
                    traccar_userID=window.localStorage.getItem("traccar_userID");
                    deviceIMEI=window.localStorage.getItem("deviceIMEI");


                }
        /*Cargados los datos de configuracion en las variables locales, listas para usarsem 
        cedemos el control al formulario principal*/
         $(":mobile-pagecontainer").pagecontainer( "change", $("#welcome" ));
         return true;
    } 
    /* si no existe el registro, avanzamos directo a la pagina de registro*/
    $(":mobile-pagecontainer").pagecontainer( "change", $("#firstime" )); 
    return false;
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
                           userpass=prompt("Ingrese la clave del dispositivo GPS, si la desconoce deje este campo en blanco");
                           if (userpass==""){userpass="123456"};
                           window.localStorage.setItem("userpass",userpass);             
                             
                            $(":mobile-pagecontainer").pagecontainer( "change", $("#welcome" ));
                            break;
                        case "1":
                            alert("No se pudo conectar con la base de datos");
                            break;
                        case "2":
                            alert("la clave introducida es inválida");
                            break;
                        case "3":
                            alert("Ya existe un dispositivo registrado con esa clave");
                            break;
                    }

    }});
        }
        else{alert("Verifique los datos ingresados. TIP: Ingrese solo némeros en el némero de teléfono");}
}
function doMenu(val)
{
    var smsstring=null;

    switch (val) {
        case 0:
            smsstring="stop"+userpass;
             if(send_command(smsstring)){alert("sms enviado")};
            break;
        case 1:
            smsstring="resume"+userpass;
            if(send_command(smsstring)){alert("sms enviado")};
            break;
        case 2:
            if(!traccar_enabled=="true")
            {
                alert("Debe configurar el servicio web antes de usar esta opcion");
                $(":mobile-pagecontainer").pagecontainer("change","#showGPS");
                window.dispatchEvent(new Event('resize'));
                
            }else{
                doTraccarPage();
                $(":mobile-pagecontainer").pagecontainer("change","#showGPS");
                window.dispatchEvent(new Event('resize'));
            }
            break; 
        case 5:
            smstring="arm"+userpass
            if (send_command(smstring)){
            alert("sms enviado");
        }
            break;
        case 4:
             smstring="nomove"+userpass;
            if(send_command(smsstring)){alert("sms enviado");};
            break;  
          
        case 3:
            smstring="move"+userpass+" 0200";
            if(send_command(smsstring)){alert("sms enviado");};
            break;  
        case 6:
            if (navigator.app) {
                navigator.app.exitApp();
                }
                else if (navigator.device) {
                    navigator.device.exitApp();
                }
            else {
                    window.close();
                }
            break;
        case 7:
            smstring="disarm"+userpass
            if (send_command(smstring)){
            alert("sms enviado");
        }
            break;
    
        default:
            break;
    }
}
function on_sms_arrive_func()
{


}
function send_command( smsc)
{

   SMS.sendSMS(numero_de_gps,smsc,function(){
            alert("el comando se ha enviado exitosamente");
            return true;
    },function(){
            alert("no se pudo enviar el mensaje");
            return false;
    });
}
function callback_recibir_sms()
{
    
}    
function doConfigAppMenu()
{
    /**Menu de configuracion de la appweb */
    traccar_username=document.getElementById("textUsrName").value;
    traccar_password=document.getElementById("textPass").value;
    deviceIMEI=document.getElementById("textIMEI").value;
   
       $.ajax(
  {
      async:false,
      cache:false,
      dataType:"json",
      type: "POST",  
      url: traccar_server+"/api/session",
      data:{email:traccar_username,password:traccar_password},
      success: function(res){
          result=res;
          traccar_session=res;
          if (result.id!=null){
                        traccar_userID=result.id;
                        window.localStorage.setItem("traccar_username",traccar_username);
                        window.localStorage.setItem("traccar_password",traccar_password);
                        window.localStorage.setItem("traccar_userID",traccar_userID);
                        window.localStorage.setItem("traccar_enabled","true");
                        traccar_enabled="true";
                        alert("configuracion exitosa.");
                        $(":mobile-pagecontainer").pagecontainer( "change", $("#welcome" ));

                                        }else{alert("verifique los datos ingresados"); }

      }
      
  });



}

function traccar_get_devices_list(command)
{
    
    $.ajax({
    async:false,    
    type: 'get',
    url: traccar_server+'/api/devices/',
    headers: {
        "Authorization": "Basic " + btoa(traccar_username + ":" + traccar_password)
    },
    success: function (response) {
        console.log(response);
        traccar_devices=response;
        return traccar_devices;
    }
});

}

function traccar_get_devices_lastestPosition(tdevices)
{
    $.ajax({
    async:false,    
    type: 'get',
    url: traccar_server+'/api/positions/',
    headers: {
        "Authorization": "Basic " + btoa(traccar_username + ":" + traccar_password)
    },
    success: function (response) {
        console.log(response);
        traccar_lastest_postitions=response;
        return traccar_lastest_postitions;
    }
});
}
function doConfigMenu(command)
{
    switch (command) {
        case 0:
            if(userpass==prompt("ingrese la clave actual del dispositivo GPS")) {
                vartemppass=prompt("ingrese la nueva clave");
                if (vartemppass==prompt("repita la nueva clave"))
                {
                    
                    userpass=vartemppass;
                    window.localStorage.setItem("userpass",userpass);
                }
                else{alert("las claves no son iguales");}
            }else
                {
                    alert("La clave introducida es invalida");
                }
            break;
        case 1:
            var newadmingps=prompt("ingrese el numero que desea autorizar");

            if(isNumeric(newadmingps)&(newadmingps.length>5))
            {
                var smsstring="admin"+userpass+" "+ newadmingps;
                send_command(smsstring);
            }else
            {
                alert("introdujo un numero invalido");
            }
            break;
        case 2:
            var apn=prompt("ingrese el APN de su proveedor de servicios");
            var smsstring="APN"+userpass+" "+ apn;
            if (apn==null){
                    break;

            }
            send_command(smsstring);
            
            break;
        case 3:
            var temppuerto=prompt("ingrese el numero de puerto");
            var smsstring="adminip"+userpass+" "+web_app_server+" "+temppuerto;
            if (temppuerto==null){
                    break;

            }
            send_command(smsstring);
            
            break;
        case 5:
            if(confirm("Esta accion no tiene reverso,continuar?")){
                window.localStorage.clear();
                alert("datos eliminados");
               $(":mobile-pagecontainer").pagecontainer( "change", $("#firstime" ));
                        }
        default:
            break;
    }


}
function doTraccarPage()
{

 var listdevices=traccar_get_devices_list();
 var divmapbotones=document.getElementById("map-botones");


  traccar_devices.forEach(function(element,index) {
      if (null==document.getElementById(element.name+"-btn"))
      {
          var stringname=element.id;
          divmapbotones.innerHTML=divmapbotones.innerHTML+"<a style='text-decoration:none' href='javascript:doGpsSelector("+stringname+ ")'><button id=" +element.name+"-btn" +">"+element.name+"</button></a>";

      }

  });

}

function doGpsSelector(command)
{
    traccar_get_devices_list();
    traccar_get_devices_lastestPosition();
    traccar_lastest_postitions.forEach(function(element,index) {
        if (element.deviceId==command)     
        {
        
            alert ("direccion"+element.address);
            traccar_devices.forEach(function(element2,index) {
                    
                    if (element2.id==element.deviceId)
                            {
                                var myLatLng = {lat:element.latitude, lng: element.longitude};
                                map.setCenter(myLatLng);
                                var marker = new google.maps.Marker({
                                map: map,
                                position: myLatLng,
                                title: element2.name
                                });
                            }
                        })
        }  
    });


}