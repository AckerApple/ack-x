export declare const Buffer: any;

export class ExString{
	string:string
	static _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

	constructor(string){
		this.string = string
		return this
	}

	/** test string against email regX */
	isEmail(){
		return this.string.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)>=0
	}

	//Node.js doesnt have .repeat as of 2/11/15
	repeat(num){
		var x,s = ''
		for(x=0; x < num; ++x)s = s + this.string
		return s
	}

	//escapes html brackets
	htmlFormat(){
		var v = this.string
		v=v.replace(/</g,'&lt;').replace(/>/g,'&gt;')
		return v
	}

	/** string becomes really long */
	toBase64(){
		var e = this._utf8_encode();
		var t="";var n,r,i,s,o,u,a;var f=0;
		while(f<e.length){
			n=e.charCodeAt(f++);r=e.charCodeAt(f++);
			i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;
			if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}
			t=t+ExString._keyStr.charAt(s)+ExString._keyStr.charAt(o)+ExString._keyStr.charAt(u)+ExString._keyStr.charAt(a)
		}
		return t
	}

	//convert string to something more safely portable
	_utf8_encode(){
		var e = this.string.replace ? this.string : this.string.toString()
		e=e.replace(/\r\n/g,"\n");var t="";
		for(var n=0;n<e.length;n++){
			var r=e.charCodeAt(n);
			if(r<128){
				t+=String.fromCharCode(r)
			}else if(r>127&&r<2048){
				t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)
			}else{
				t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)
			}
		}
		return t
	}

	//Typically NODE ONLY
	toHex(encType){
		encType = encType || 'hex'
		return new Buffer(this.string,encType).toString('hex')
	}

	//Typically NODE ONLY
	toBinary(encType){
		encType = encType || 'binary'
		return new Buffer(this.string,encType)
	}
}

/*
ExString.prototype.isBinary = function(){
	return /^[01]+$/.test(this.string)
}
*/

export function method(variable:number):ExString{
	return new ExString(variable)
}