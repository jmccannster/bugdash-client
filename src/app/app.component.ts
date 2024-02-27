import { Component } from '@angular/core';
import { Observable, concatMap, map } from 'rxjs';
import { User } from './models/user';
import { MySocketService } from './services/my-socket.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe, UpperCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CHTService } from './components/CHT/cht.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, AsyncPipe, UpperCasePipe, RouterOutlet]
})
export class AppComponent {
  title = 'socketclient';

  users$?: Observable<User[]>;
  userName?: string;
  name: string = '';
  isOnline: boolean = false;

  speed$?: Observable<number>;

  cht$?: Observable<number>;

  constructor(
    private socket: MySocketService,
    private chtSvc: CHTService
    ) {}

  ngOnInit(): void {
    this.users$ = this.socket
      .getClientId()
      .pipe(
        concatMap((clientId) =>
          this.socket
            .getUsersOnline()
            .pipe(map((users) => {
                  //users = users.filter((u) => u.id !== clientId);
                  console.log(JSON.stringify(users));
                  return users;                  
            }
              )
            )
        ));
        
    this.speed$ = this.socket
            .getSpeed()
            .pipe(map( (mph) => { 
              console.log(`MPH: ${mph}`);
              return mph;} ));
              
   /* this.speed$.subscribe( s => {
      //let d:Date = new Date().toTimeString()
      console.log(`s: ${s} + ${new Date().toTimeString()}`) 
    }); */

    this.cht$ = this.socket
      .getCht()
      .pipe(map( (cht) => {
        console.log(`CHT: ${cht}`);
        this.chtSvc.update(cht);
        return cht;
      }));

    this.cht$.subscribe( data => {
      console.log(`cht: ${data} ${new Date().toTimeString()}`);
    });
  }

  join() {
    if (!this.name) {
      return;
    }

    this.socket.emitUser({
      id: '1',
      name: this.name,
    });
    this.userName = this.name;
    this.name = '';
    this.isOnline = true;
  }

  exit() {
    this.socket.emitExit();
    this.isOnline = false;
  }
}
