import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

    appareilsSubject = new Subject<any[]>();

    private appareils = [];

    constructor(private httpClient: HttpClient){}

    emitAppareilSubject(){
        this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnAll(){
          for(let appareil of this.appareils){
              appareil.status = 'allumé';
          }
          this.emitAppareilSubject();
      }

    switchOffAll(){
        for(let appareil of this.appareils){
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(i: number){
        this.appareils[i].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(i: number){
        this.appareils[i].status = 'éteint';
        this.emitAppareilSubject();
    }
    
    getAppareilById(id: number){
        const appareil = this.appareils.find(
            (s) => {
                return s.id == id;
            }
        );
        return appareil;
    }

    addAppareil(name: string, status: string){
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length -1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer(){
        this.httpClient
            .put('https://projet-angular-a346f-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log('Une erreur est survenue : '+error);
                }
            );
    }
    getAppareilsFromServer(){
        this.httpClient
            .get<any[]>('https://projet-angular-a346f-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
            .subscribe(
                (response) => {
                    console.log('Récupération ok');
                    this.appareils = response;
                    this.emitAppareilSubject();
                },
                (error) => {
                    console.log('Une erreur est survenue ! ' + error);
                }
            )
    }

}