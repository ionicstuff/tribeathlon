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
<<<<<<< HEAD
        return this.httpService.post('auth/register', postData);
=======
        return this.httpService.post('register', postData);
>>>>>>> 480c295f67330c100e00bbc9c57745dc98035af6
    }

    logout() {
        this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
            AuthConstants.authenticateData={};
            this.router.navigate(['/login']);
        });
    }
}