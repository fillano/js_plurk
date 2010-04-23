(function (GLOBAL){
	if(GLOBAL.PLURK) {
		GLOBAL._PLURK = GLOBAL.PLURK;
	}
	
	var PLURK = GLOBAL.PLURK = function(c){
		return new PLURK.fn.init(c);
	};

	PLURK.fn = PLURK.prototype = {
		key: '',
		url: ['https://www.plurk.com/API','http://www.plurk.com/API'],
		init: function(c) {
			if(c) {
				for (var i in c) {
					if(c.hasOwnProperty(i)) {
						this[i] = c[i];
					}
				}
			}
		}
	};
	PLURK.fn.init.prototype = PLURK.fn;

	PLURK.extend = PLURK.fn.extend = function(n,f) {
		var target = this;
		if(!target[n]) {
			target[n] = f;
		}
	};

	function set2cookie(s){
		s = s.substring(s.indexOf(':')+1,s.length).trim();
		var arr = s.split(';');
		var ret = '';
		var i = 0;
		var arr2 = [];
		for(;i<arr.length;i++){
			var tmp = arr[i].trim();
			var name = tmp.split('=')[0].trim().toLowerCase();
			switch(name){
				case 'expires':
					break;
				case 'max-age':
					break;
				case "version":
				case "domain":
				case "path":
					arr2.push('$'+tmp);
					break;
				default:
					arr2.push(tmp);
					break;
			}
		}
		s = 'Cookie:'+arr2.join(';');
		return s;
	}

	PLURK.fn.extend(
		'getAPIUrl', function(uri, index){
			uri = uri || '';
			if(this.url[index]) {
				return this.url[index]+uri;
			}else{
				return uri;
			}
		}
	);
	PLURK.fn.extend(
		'getKey', function(){
			return this.key;
		}
	);
	PLURK.fn.extend(
		'login', function(n,p,f){
			if(typeof(Curl)=='undefined'){
				loadPlugin('v8-juice-libcurl');
			}
			var c = new Curl();
			var target = this;
			c.setOpt({
				url: this.getAPIUrl('/Users/login',0)+'?api_key='+this.getKey()+'&username='+n+'&password='+p+'&no_data=1',
				userAgent:"v8-juice-shell",
				writeFunction:function writeFunction(data,len,ud){
					target.response = JSON.parse(data);
					++ud.count;
					return data.length;
				},
				writeData:{count:0},
				headerFunction:function headerFunction(data,len,ud){
					++ud.count;
					var header = data.substring(0,data.length);
					if(header.indexOf('Set-Cookie:')>-1){
						target.cookie = set2cookie(header);
					}
					return data.length;
				},
				headerData:{count:0}
			});
			var rc = c.easyPerform();
			c.destroy();
		}
	);
	PLURK.fn.extend(
		'logout',function(f){
			if(typeof(Curl)=='undefined'){
				loadPlugin('v8-juice-libcurl');
			}
			var c = new Curl();
			var target = this;
			c.setOpt({
				url: this.getAPIUrl('/Users/logout',1)+'?api_key='+this.getKey(),
				userAgent:"v8-juice-shell",
				writeFunction:function writeFunction(data,len,ud){
					target.response = JSON.parse(data);
					++ud.count;
					return data.length;
				},
				writeData:{count:0},
				headerFunction:function headerFunction(data,len,ud){
					++ud.count;
					return data.length;
				},
				headerData:{count:0}
			});
			var rc = c.easyPerform();
			c.destroy();
			this.cookie = '';
		}
	);
	PLURK.fn.extend(
		'plurkAdd',function(p,q,l,f){
			if(typeof(Curl)=='undefined'){
				loadPlugin('v8-juice-libcurl');
			}
			var c = new Curl();
			var target = this;
			c.setOpt({
				url: this.getAPIUrl('/Timeline/plurkAdd',1)+'?api_key='+this.getKey()+'&content='+GLOBAL.encodeURI(p)+'&qualifier='+q+'&lang='+l,
				userAgent:"v8-juice-shell",
				httpHeader:[this.cookie],
				writeFunction:function writeFunction(data,len,ud){
					print(data);
					try {
						target.response = JSON.parse(data);
					}catch(e){
						print(e);
					}finally{
						++ud.count;
						return data.length;
					}
				},
				writeData:{count:0},
				headerFunction:function headerFunction(data,len,ud){
					++ud.count;
					return data.length;
				},
				headerData:{count:0}
			});
			var rc = c.easyPerform();
			c.destroy();
		}
	);
})(this);

