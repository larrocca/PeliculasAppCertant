import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  url:string = 'https://api.themoviedb.org/3';
  carteleraPage = 1;

  constructor(
    private _htpp : HttpClient

  ) { }

  get params(){
    return{
    api_key:'be3a3196ef3c31aa444baeadee097419',
    lenguage: 'en-US',
    page:this.carteleraPage.toString() //Todos los parametros tienen que ser Strings
    }
  }

  getCartelera():Observable<CarteleraResponse>{ //De esta forma podmeos aclararle al get que va a retornar la data con una interfaz de ese objeto, ya teniendo en el retorno un objeto CarteleraResponse
    return this._htpp.get<CarteleraResponse>(`${this.url}/movie/top_rated`,{
      params: this.params //De esta forma se simplifica mucho mas el Url del get, los parametros los podemos pasara haciendo el ,{params:}, ya teniendolos deifnidos arriba
    }).pipe(
      tap(()=>this.carteleraPage+=1) //El tap lo que hace es no modifica la data que se envia pero ejecuta la suma de +1 al final de ejecutar el get
    )
  }
}
