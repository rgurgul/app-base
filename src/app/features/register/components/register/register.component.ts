import { map } from 'rxjs/operators';
import { Api } from './../../../../shared/api';
import { HttpResponseModel } from './../../../../shared/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  data$!: Observable<any>;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {

    this.data$ = this.http.get<HttpResponseModel>(Api.DATA_FORM_CONFIG).pipe(map((resp: HttpResponseModel) => resp.data));

  }

}
