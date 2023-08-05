import { Component,ViewChild,ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService:GifsService) {

  }
  searchTag():void {
    const newTag =  this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
