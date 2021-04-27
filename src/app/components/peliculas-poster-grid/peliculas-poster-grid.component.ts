import { Component, Input, OnInit } from '@angular/core';
import { CarteleraResponse,Movie} from '../../interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() peliculasGrid:Movie[]= []

  constructor(
    private _router : Router
  ) { }

  ngOnInit(): void {
    console.log(this.peliculasGrid)
  }

  onMovieClick(pelicula:Movie){
    console.log(pelicula)
    this._router.navigate(['pelicula', pelicula.id])
  }

}
