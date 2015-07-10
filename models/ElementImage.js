export default class ElementImage{
  constructor(url, ratio, info = null){
    this._url    = url;
    this._ratio  = ratio;
    this._info   = info;
    this.kind    = 'image';
  }

  get url(){
    return this._url;
  }
  set url(url){
    this._url = url;
  }

  get ratio(){
    return this._ratio;
  }
  set ratio(ratio){
    this._ratio = ratio;
  }

  get info() {
    return this._info;
  }
  set info(info){
    this._info = info;
  }

};