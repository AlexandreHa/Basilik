//On instancie les librairies

var visitor = Visitor.getInstance("ID@AdobeOrg", {
                trackingServer: "xxxxx.d3.sc.omtrdc.net",
                trackingServerSecure: "xxxxx.d3.sc.omtrdc.net", 
              });

var a_nalytics = new AppMeasurement();
	a_nalytics.trackingServer = "xxxxx.d3.sc.omtrdc.net";
	a_nalytics.trackingServerSecure = "xxxxxx.d3.sc.omtrdc.net";
	a_nalytics.account="mareportsuite";
	a_nalytics.visitor = visitor;

// On défini la fonction a éxécuter en callBack du hit, elle va servir notemment à vider le semaphore et cleaner l'objet analytics
	
a_nalytics.registerPostTrackCallback(function(requestURL){
	console.log(semaphore);
	console.log("callback");
	console.log(requestURL);
	a_nalytics.clearVars();
	semaphore.shift();
});

// Suivant les types de config/environnement/etc ces lignes peuvent changer

/*
semaphore.push('pageView');
_satellite.track('global_variable_setup');
_satellite.track('pageView');
*/

Analytics_setup_finished = true;

//On relance tout les pushs mis en attente de CC;

Metronome();