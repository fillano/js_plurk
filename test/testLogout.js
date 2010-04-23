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
	a.extend('getCookie',function(){
		return this.cookie;
	});
	a.extend('getResponse',function(){
		return this.response;
	});
	a.login(
		'your accout',
		'your password'
	);
	ok(
		a.getResponse().success_text == 'ok',
		'Test login() successed. and received cookie => '+a.getCookie(),
		print
	);
	a.logout();
	ok(
                a.getResponse().success_text == 'ok',
                'Test logout() successed. and cookie cleared => '+a.getCookie(),
                print
	);
	teardown();
})();
