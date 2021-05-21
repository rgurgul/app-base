import { map, tap, withLatestFrom } from 'rxjs/operators';
import { ItemsService } from './../services/items.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-details',
  template: `
    <p>
      details works!
    </p>
  `,
  styles: [
  ]
})
export class DetailsComponent implements OnInit {

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.itemsService.getState()
      .pipe(
        withLatestFrom(this.route.params),
        map(([data, { id }]) => data.find((item) => item.id === id))
      )
      .subscribe((data) => {
        console.log(data);
      })
    //this.itemsService.fetch();
  }

}
