import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // let headers= new HttpHeaders();
  isUserLoggedIn=new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject(null);
  private loggedIn = false;
  private tokenExpirationTimer: any;
  activeTabSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   constructor(private http: HttpClient, private router: Router) { 
    this.clearUserData();
   }
   setActiveTab(tab: string) {
    console.log('Setting active tab:', tab);
    this.activeTabSubject.next(tab);
  }
  userlogin(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    
    const body = JSON.stringify({ email, password });
    
    return new Observable(observer => {
      this.http.post('https://api.digitalbusinessreview.com/api/v1/admin/login', body, { headers, observe: 'response' }).subscribe(
        response1 => {
          this.isUserLoggedIn.next(true);
          localStorage.setItem('admin',JSON.stringify(response1.body))      
          this.router.navigate(['/dashboard'])
          console.warn('response1:',response1);
          observer.next(response1);
          observer.complete();
        },
        error => {
          if (error.status === 400) {
            observer.error('Invalid Email or Password');
          } else {
            observer.error('Something Went Wrong');
          }
        }
      );
    });
  }
  logout() {
    this.user.next(null);
    sessionStorage.clear();
    localStorage.clear();
    // sessionStorage.removeItem('userData');
    // sessionStorage.removeItem('cloudCrmIDs');
    // sessionStorage.removeItem('crmIDs');
    // sessionStorage.removeItem('nonCloudcrmIDs');
    // sessionStorage.removeItem('sideMenu');
    // sessionStorage.removeItem('cloudRequestType');
    // localStorage.removeItem('userData');
    // localStorage.removeItem('cloudCrmIDs');
    // localStorage.removeItem('crmIDs');
    // localStorage.removeItem('nonCloudcrmIDs');
    // localStorage.removeItem('sideMenu');
    // localStorage.removeItem('cloudRequestType');
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.isUserLoggedIn.next(false);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  setLoggedInUser(user: any) {
    this.user.next(user);
    this.isUserLoggedIn.next(true);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin');
  }
  clearUserData() {
    // Clear any user-related data such as tokens, logged-in status, etc.
    localStorage.removeItem('admin');
    this.isUserLoggedIn.next(false); // Assuming you have a BehaviorSubject to track login status
    this.activeTabSubject.next(''); // Assuming you have a BehaviorSubject to track active tab
  }
  // reloadAdmin(){
  //   if(localStorage.getItem('admin')){
  //     this.isUserLoggedIn.next(true);
  //      this.router.navigate(['/dashboard']);
  //   }
  // }
}