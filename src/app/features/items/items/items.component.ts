import { ItemsService } from './../items.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  data$!: Observable<any>;

  constructor(
    private itemsService:ItemsService
  ) {
  }

  buy(item: any) {
    this.itemsService.addItem(item);
  }

  ngOnInit(): void {

    this.data$ = this.itemsService.getState();

  }

}
