import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @desc    Register user
    // @route   POST /auth/signup
    // @access  Public
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    }

    
    // @desc    Log in user
    // @route   POST /auth/login
    // @access  Public
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.logIn(dto);
    }
}



    // How Pipes work when created manually 

    // @Post('login')
    // login(
    //     @Body('email') email: string,
    //     @Body('password', ParseIntPipe) password: string,
    // ) {
    //     console.log({
    //         email,
    //         typeOfEmail: typeof email,
    //         password,
    //         typeOfPassword: typeof password,
    //     })
    //     return this.authService.logIn();
    // }