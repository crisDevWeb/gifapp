import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList:Gif[] = [];
  private _tagHistory: string [] = [];
  private apyKey:string = 'AoJzJfVdtTCk87y6uIb4otlGioSjQvMJ';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  constructor(private htpp:HttpClient) { 
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [ ...this._tagHistory ];
  }

   searchTag(tag:string): void {
    if( tag.length === 0) return;
    this.organizeHistory(tag);
    // Añadimos los query params de esta peticion
    // api.giphy.com/v1/gifs/search?api_key=AoJzJfVdtTCk87y6uIb4otlGioSjQvMJ&q=valorant&limit=10
    const params = new HttpParams()
    .set('api_key',this.apyKey)
    .set('q',tag)
    .set('limit','10');
    const url = `${ this.serviceUrl }/search`
    // Tipamos nuestra respuesta get
    this.htpp.get<SearchResponse>(url, { params })
    .subscribe((resp)=> {

      this.gifsList = resp.data;    
  
    });
    
  }

  private organizeHistory(tag: string):void {
    tag = tag.toLowerCase();
    // Si el tag a buscar ya esta en el array
    if(this._tagHistory.includes(tag)) {
      // Borralo
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !==tag);
    }

    // Insertamos el nuevo tag al inicio
    this._tagHistory.unshift(tag);
    //Limitamos a 10 tags
    this._tagHistory = this._tagHistory.splice(0,10);
    this.saveLocalStorage();
    // this.loadPopItem();
  }

  private saveLocalStorage():void {
    // transformamos a string nuestro objeto
    const historyTag = JSON.stringify(this._tagHistory);
    localStorage.setItem('history',historyTag);
  }
  
  private loadLocalStorage():void {
    // Si no tenemos data no hacemos nada
    if(!localStorage.getItem('history')) return;
    // Le decimos con ! que siempre vendra data
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length ===0) return;
    
    this.searchTag(this._tagHistory[0]);
    
  }

 
}
