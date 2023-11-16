import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
export class User {
    name!: string;
    email!: string;
   
  }
@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    parsedJson: any; 
    jsonData: any; 
    private currentUserSubject!:  BehaviorSubject<User>;
    public currentUser!: Observable<User>;
    constructor(private http: HttpClient) {
        
    }
    ngOnInit(): void {
        if("currentUser" in localStorage  && localStorage.getItem('currentUser') != ''){
            this.jsonData = localStorage.getItem('currentUser');
            this.parsedJson = JSON.parse(this.jsonData);

            this.currentUserSubject = new BehaviorSubject<User>(this.parsedJson);
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }
    public get currentUserValue() {
        if("currentUser" in localStorage  && localStorage.getItem('currentUser') != ''){
            return this.currentUserSubject.value;
        }else{
            return null;
        }
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {

            this.http.post(`${environment.apiUrl}/login`, { email: email, password: password }).subscribe((user: any) => {
                console.log(user);
                if (user && user.data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.data.user));
                    localStorage.setItem('apiToken', user.data.apiToken);
                    console.log(user.data.user);
                    this.currentUserSubject = new BehaviorSubject<User>(user.data);
                    this.currentUser = this.currentUserSubject.asObservable();
                    // this.currentUserSubject.next(user.data.user)
                }
                resolve(user);
            }, err => {
                console.log(err);
                reject(err);
            });
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
        // this.currentUserSubject.next(new User);      
    }
}
