import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';
import { Observable } from 'rxjs';
import { CarteleraResponse, Movie, Cast, CreditsResponse } from '../interfaces/cartelera-response';
import {map,tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  url:string = 'https://api.themoviedb.org/3';
  carteleraPage = 1;
  cargando = false

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
    this.cargando = true //Para que no envie mas de una llamada a la api al mismo tiempo
    return this._htpp.get<CarteleraResponse>(`${this.url}/movie/top_rated`,{
      params: this.params //De esta forma se simplifica mucho mas el Url del get, los parametros los podemos pasara haciendo el ,{params:}, ya teniendolos deifnidos arriba
    }).pipe(tap(()=>{this.carteleraPage+=1; this.cargando = false}))  //El tap lo que hace es no modifica la data que se envia pero ejecuta la suma de +1 al final de ejecutar el get
  }

  buscarPeliculas (texto:string){
    const params = {...this.params, page:'1',query:texto}
    return this._htpp.get<CarteleraResponse>(`${this.url}/search/movie`,{params}).pipe(map( resp => resp.results)) //utilizamos <CarteleraResponse> cuando nos va a devolver un array de objetos al cual queremos darle una interfaz
  }

  /*
  getPeliculaPorId (id:number){
    return this._htpp.get<Movie>(`${this.url}/movie/${id}`,{params:this.params})//Al poner el <Movie> al lado del get estamos determinando que tipo de observable va a devolver
  }
  */

  getPeliculaPorId (id:number){
    return this._htpp.get<Movie>(this.url + '/movie/' + id, {params: this.params}); //Al poner el <Movie> al lado del get estamos determinando que tipo de observable va a devolver
  }

  
  getCast(id:number){
    return this._htpp.get<CreditsResponse>(this.url + '/movie/' + id + '/credits',{params:this.params} )//Al poner el <Cast> al lado del get estamos determinando que tipo de observable va a devolver
    .pipe(map(resp => resp.cast)) //con esta fomra usando el .pipe y el map le decimos que es solamnete lo que queremos tener, lo que nos interesa de todo ese largo objeto
  }

}
