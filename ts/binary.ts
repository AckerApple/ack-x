export class jXBinary{
  binary:any

  constructor(binary){
  	this.binary = binary
  	return this
  }

  is(){
  	return /^[01]+$/.test(this.binary)
  }
}

export function method(path){
  return new jXBinary(path)
}
