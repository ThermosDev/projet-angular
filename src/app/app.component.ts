import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSub: Subscription;

  ngOnInit(){
    const counter = Observable.interval(1000);
    this.counterSub = counter.subscribe(
      (value) =>{
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, une erreur est survenue ! '+ error);
      },
      () => {
        console.log('Observable complete !');
      }
    )
  }

  ngOnDestroy(): void {
    this.counterSub.unsubscribe();
  }

}
