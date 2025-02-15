import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @desc    Register user
    // @route   POST /auth/signup
    // @access  Public
    @Post('signup')
    signup() {
        return this.authService.signUp();
    }

    
    // @desc    Log in user
    // @route   POST /auth/login
    // @access  Public
    @Post('login')
    login() {
        return this.authService.logIn();
    }

}
