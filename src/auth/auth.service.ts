import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signUp(dto: AuthDto){
        //generate password hash
        const hash = await argon.hash(dto.password);
        //save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
    
            // Return user without hash
            const { hash: _, ...userWithoutHash } = user;
    
            return userWithoutHash;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError)
                if(e.code === 'P2002')
                    throw new ForbiddenException('Credentials taken')
            throw e;
        }
        
    }

    async logIn(dto: AuthDto){
        // get user
        const user = 
            await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            }
        )

        if(!user) 
            throw new ForbiddenException("Credentials incorrect")

        // compare user password
        const pwMatches = await argon.verify(user.hash, dto.password)

        if(!pwMatches)
            throw new ForbiddenException("Credentials incorrect")

        // Return user without hash
        const { hash: _, ...userWithoutHash } = user;

        return userWithoutHash;
    }
}
