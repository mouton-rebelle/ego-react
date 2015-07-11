export default class ElementInfoData{
  constructor(title, desc){
    this._title = title;
    this._desc  = desc;
  }

  get title(){
    return this._title
  }

  set title(title){
    this._title = title;
  }

  get desc(){
    return this._desc
  }

  set desc(desc){
    this._desc = desc;
  }

};