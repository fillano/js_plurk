function ok(cond, mess, view){
	if(cond===true) {
		view(mess);
	}else{
		view('Test Failed.');
	}
}
