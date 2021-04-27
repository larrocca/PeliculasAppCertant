import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  peliculasABuscar: Movie[] = []
  valorBuscado : string |undefined

  constructor(
    private _route : ActivatedRoute,
    private peliculaService : PeliculasService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(data =>{
    this.valorBuscado = data.texto //Valor de busqueda
    this.peliculaService.buscarPeliculas(data.texto).subscribe(peliculas =>{ //Sacamos el parametro que enviamos por ruta, para mandarlo por la peticion del servicio y traernos lo que coincida con el texto del parametro,data.texto es el parametro enviado
      this.peliculasABuscar = peliculas //Array que iniciamos igualado al array que nos trae el get de buscar peliculas
      })
    })
  }
}
