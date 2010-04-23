function setup(){
	include('../lib/funit.js');
	include('../lib/jsplurk.js');
}
function teardown(){
}
(function(){
	setup();
	var a = PLURK(
		{
			'key':'put your api key here.'
		}
	);
	a.extend('setKey',function(v){
		this.key = v;
	});
	ok(
		a.getKey() == 'put your api key here.',
		'Test getKey() successed.',
		print
	);	
	teardown();
})();
