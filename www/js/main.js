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
      myDB.transaction(function(transaction) {
      var executeQuery = "SELECT * FROM config";
      transaction.executeSql(executeQuery, [ ],
      function(tx, result) {
                      if (result.rows.length>0){
                            /* La aplicacion ya ha sido previamente configurada  */
                            
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