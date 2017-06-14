//Definition des variables
var dataLayer = window.dataLayer||[];
    window.Analytics_setup_finished = false;
	window.waitList = [];
    window.semaphore = [];
	window.checkDC = function(elem){
		return elem.name == this;
	};

//Surcharge du dataLayer.push	
	
dataLayer._push = dataLayer.push;
dataLayer.push = function(push){
	
	for(var key in push){
		_satellite.setVar(key,push[key]);
		if(key ==="event"&& typeof _satellite.directCallRules.find(checkDC,push[key]) != 'undefined'){
		  if(!Analytics_setup_finished){
			console.log('push ajouté au metronome');
			waitList.push(push);
		  }else{
			semaphore.push(push[key]);
			_satellite.track('global_variable_setup');
			_satellite.track(push[key]); 
		  }
		}
	}
	dataLayer._push(push);
}

//definition de la fonction qui relance les evennements mis en attente

window.Metronome = function(){
  console.log(semaphore.length);
  if(waitList.length!=0){
    if(semaphore.length==0){
      semaphore.push(waitList[0].event);
	  _satellite.track('global_variable_setup');
      _satellite.track(waitList[0].event);
      waitList.shift();
      window.Metronome();
    }else{
      setTimeout(arguments.callee,300);
    }
  }
}