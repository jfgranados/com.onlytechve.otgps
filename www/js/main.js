var db = null;

            document.addEventListener("deviceready", function(){
            db = window.sqlitePlugin.openDatabase({name: "com.onlytechve.otgps.db"});
            db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS config (name text primary key, data text)");
            }, function(err){
                    alert("Error inicializando la base de datos.");
                        });
                        
    }, false);                        