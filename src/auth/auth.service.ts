import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signUp(dto: AuthDto){
        //generate password hash
        const hash = await argon.hash(dto.password);
        //save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        })

        // Return user without hash
        const { hash: _, ...userWithoutHash } = user;

        return userWithoutHash;
    }
    logIn(){
        return { msg: 'user log in'};
    }
}
