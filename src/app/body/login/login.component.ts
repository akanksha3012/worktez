import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  username: string
  showPassword: boolean = false
  componentName: string = "LOGIN"

  activeLogin: boolean = true

  constructor(public authService: AuthService, public router: Router, public navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService, private location: Location) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
  }

  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      const path = this.location.path();
      if (path.startsWith('/verifyUser')) {
        this.navigateToVerification(path);
      } else {
        this.navigateToHome();
      }
    }).catch((err) => {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      console.log(err);
    });
  }

  onLogOut() {
    this.authService.logout().then(() => {
      this.navigateToHome();
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSignUpWithEmail() {
    this.authService.createUser(this.email, this.password, this.username).then(() => {
      this.navigateToHome();
    }).catch((err) => {
      console.log(err.message);
    });
  }

  onLoginWithEmail() {
    this.authService.loginUser(this.email, this.password).then(() => {
      const path = this.location.path();
      if (path.startsWith('/verifyUser')) {
        this.navigateToVerification(path);
      } else {
        this.navigateToHome();
      }
    }).catch((err) => {
      console.log(err.message);
    });;
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToDashboard() {
    this.router.navigate(['MyDashboard']);
  }

  navigateToVerification(path) {
    this.router.navigate([path]);
  }

  changeTab() {
    this.activeLogin = !this.activeLogin;
  }
}
