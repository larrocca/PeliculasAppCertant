import { Component, Input, OnInit,AfterViewInit } from '@angular/core';
import { Swiper } from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit,AfterViewInit{
  
  @Input() peliculas: Movie[] = [] //Esta variable input recibe el valor que se le esta enviando como propiedad, tienen que llamarse de la mimsa manera
  swipe:Swiper|undefined


  constructor() { }

  ngAfterViewInit():void{
     this.swipe = new Swiper('.swiper-container', {
      loop: true,
    });

    this.swipe.slideNext();
  }

  onSlideNext(){
    this.swipe?.slideNext()
  }

  onSlidePrev(){
    this.swipe?.slidePrev()
  }


  ngOnInit(): void {
    //console.log(this.peliculas)
  }

}
