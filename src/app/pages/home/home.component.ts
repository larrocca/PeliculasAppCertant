import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  peliculasArray:Movie[] = []
  peliculasDeCarga: Movie[] = []

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = document.documentElement.scrollTop + 1300; //Esto lo hacemos para ver cual es la posicion del scroll cuando llega al final,le sumamso 1300 para que el numero este cerca del final pero no el scroll y pueda ir cargando desde antes las imagnes
    const max = (document.documentElement.scrollHeight) //igualando al height seria la utlima posicion
    if (pos > max) {
      this.peliulasService.getCartelera().subscribe(resp =>{
        this.peliculasDeCarga.push(...resp.results) //Siempre .results porque son los objetos movie
      })
    }
  }

  constructor(
    private peliulasService : PeliculasService
  ) {
    this.peliulasService.getCartelera().subscribe(data =>{
      console.log(data)
      this.peliculasArray = data.results //Se iguala a cada objeto de la interfaz CareleraResponse, que transformamos cuando trajimos el JSON,results seria cada objeto Movie, dentro de la interfaz CarteleraResponse
      this.peliculasDeCarga = data.results //Este es el array que se va a generar de la segunda pagina de peliculas una vez que el scroll este llegando al final
    })
   }

  ngOnInit(): void {
  }

}
