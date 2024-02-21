import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class MySocketService {
  constructor(private socket: Socket) {}

  emitUser(user: User): void {
    this.socket.emit('add-user', user);
  }

  emitExit(): void {
    this.socket.emit('exit');
  }

  getClientId(): Observable<string> {
    return this.socket.fromEvent('user-id');
  }
  
  getUsersOnline(): Observable<User[]> {
    console.log('getUsersOnline....');
    return this.socket.fromEvent<User[]>('users-online');
  }

  getSpeed(): Observable<number> {
    return this.socket.fromEvent<number>('speed');
  }

  getCht(): Observable<number> {
    return this.socket.fromEvent<number>('cht');
  }

}