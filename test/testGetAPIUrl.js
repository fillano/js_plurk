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
        ok(a.getAPIUrl('',0)==='https://www.plurk.com/API','Test getAPIUrl(\'\',0) successed.', print);
        ok(a.getAPIUrl('',1)==='http://www.plurk.com/API','Test getAPIUrl(\'\',1) successed.', print);
        teardown();
})();

