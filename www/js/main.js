var db = null;
var username=null;
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
   var db = window.sqlitePlugin.openDatabase({name: "com.onlytechve.GPS.db"});
   if  (db!=null)
   {
       /* creamos la tabla configuracion si no existe */
       db.transaction(function(transaction) {
       var executeQuery = "CREATE TABLE IF NOT EXIST config id integer primary key,title text,data text";
       transaction.executeSql(executeQuery, [ ],
       function(tx, result) {
                       console.log("Creada la tabla configuracion");                           },
                   function(error){
                       console.log("no se pudo crear la tabla configuracion");
                       });});
      /* Leemos el contenido de la tabla*/ 
      db.transaction(function(transaction) {
      var executeQuery = "SELECT * FROM config";
      transaction.executeSql(executeQuery, [ ],
      function(tx, result) {
                      if (result.rows.length>0){
                            /* La aplicacion ya ha sido previamente configurada  */
                            read_configuration(result);
                            $(":mobile-pagecontainer").pagecontainer( "change", $("#welcome" ));
                            }else
                            {
                             /** La aplicacion no ha sido configurada previamente ir a la pagina de configuracion */

                            }
                          },
                  function(error){
                      // Error
                      });});                
       
       
        
    }

}

function read_configuration(rx)
{
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
                alert("Debe configurar el servicio web antes de usar esta opcion")
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

    