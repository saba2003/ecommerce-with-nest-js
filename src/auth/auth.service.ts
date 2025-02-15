import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
    logIn(){
        return { msg: 'user log in'};
    }
    signUp(){
        return { msg: 'user reg up'};
    }
}
