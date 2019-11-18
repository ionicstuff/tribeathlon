import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { promise } from 'protractor';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private httpService: HttpService,
        private storageService: StorageService,
        private router: Router
    ) {
        console.log("Auth Service init");
     }

    login(postData: any) {
        //console.log(postData);
        return this.httpService.post('auth/login', postData);
    }

    signup(postData: any){
        return this.httpService.post('auth/register', postData);
    }

    logout() {
        this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
            AuthConstants.authenticateData={};
            this.router.navigate(['/login']);
        });
    }
}