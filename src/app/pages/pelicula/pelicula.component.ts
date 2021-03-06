import { Component, OnInit, Pipe } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/cartelera-response';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

    peliculaBuscadaPorId:Movie ={
     adult: false,
     backdrop_path: '',
     genre_ids:[0],
     id:0,
     original_language: '',
     original_title: '',
     overview:'',
     popularity:0,
     poster_path:'',
     release_date: new Date(),
     title:'',
     video:false,
     vote_average:0,
     vote_count:0,
   }

    casts:Cast[] = []

  idBuscado:number=0

  constructor(
    private peliculasService : PeliculasService,
    private _activatedRoute : ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( params =>{
  
      this.idBuscado = params.id})
      this.peliculasService.getPeliculaPorId(this.idBuscado).subscribe(data => {
      console.log(data)
      this.peliculaBuscadaPorId = data //Igualamos la data a un objeto indivual de tipo Movie, no un array, porque nos trae solamente un objeto
      console.dir(this.peliculaBuscadaPorId)
      this.peliculasService.getCast(this.peliculaBuscadaPorId.id).subscribe(data => {
        this.casts = data
        console.log(this.casts)
      })
    })
  }

  onRegresar(){
    this.location.back();
  }

}
