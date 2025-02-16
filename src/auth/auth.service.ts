import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    signUp(){
        return { msg: 'user reg up'};
    }
    logIn(){
        return { msg: 'user log in'};
    }
}
