export default class ElementMesh{
  constructor(horizontal, ratio, content, info = null){
    this._horizontal = horizontal;
    this._ratio      = ratio;
    this._content   = content;
    this._info       = info;
    this.kind = 'mesh';
  }

  get horizontal(){
    return this._horizontal;
  }
  set horizontal(horizontal){
    this._horizontal = horizontal;
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

  get content(){
    return this._content;
  }
  set content(content){
    this._content = content;
  }

};