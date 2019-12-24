import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = [];
  constructor() { }
  setData(id, data) {
    this.data[id] = data;
  }
 
  getData(id) {
    console.log('I am in getData function right now' + this.data);
    return this.data[id];
  }
}
