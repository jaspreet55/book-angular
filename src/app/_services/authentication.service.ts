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
    public currentUser!: User;
    constructor(private http: HttpClient) {
        
    }
    ngOnInit(): void {
        this.getCurrentUser();
    }
    getCurrentUser(){
        if("currentUser" in localStorage  && localStorage.getItem('currentUser') != ''){
            this.jsonData = localStorage.getItem('currentUser');
            this.parsedJson = JSON.parse(this.jsonData);
            this.currentUser = this.parsedJson;
        }
        return this.currentUser;
    }
   

    isLoggedIn() {
        if("apiToken" in localStorage  && localStorage.getItem('apiToken') != ''){
            return true;
        }else{
            return false;
        }
    }

    login(email: string, password: string) {

        return  this.http.post(`${environment.apiUrl}/login`, { email: email, password: password });
       
    }
    GetToken(){
        return  localStorage.getItem('apiToken') || '';
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();  
        this.currentUser ={email:'',name:''};   
    }
}
