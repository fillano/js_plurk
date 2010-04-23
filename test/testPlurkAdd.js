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
			'key':'add your api key here.'
		}
	);
	a.extend('getCookie',function(){
		return this.cookie;
	});
	a.extend('getResponse',function(){
		return this.response;
	});
	a.login(
		'your account',
		'your password'
	);
	a.plurkAdd(
		'利用v8-juice製作javascript的發噗程式，目前實作了login, logout, plurkAdd三個API介面，夠發噗了（測試中）',
		'says',
		'tr_ch'
	);
	ok(
		a.getResponse().qualifier == 'says',
		'Test plurkAdd() successed. and content => '+a.getResponse().content,
		print
	);
	a.logout();
	teardown();
})();
