import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private gifsService:GifsService) { }
  
  get tags() {
   return  this.gifsService.tagsHistory;
  }

// Recargar gifs al presionar el boton
  reloadGifs(tag:string):void {
    this.gifsService.searchTag(tag);
  }
}
