import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formSignin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })
  loginError = false

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }
  async onHandleSubmit() {
    if (this.formSignin.valid) {
      const email: string = this.formSignin.value.email ?? '';
      const password: string = this.formSignin.value.password ?? '';

      if (email && password) {
        const user: User = { email, password };
        try {
          const data = await firstValueFrom(this.authService.signin(user));
          console.log(data);

          if (data.success) {
            alert("Sign in successful")
            this.route.navigate(['/admin']);
          } else {
            this.loginError = true;
            console.log(this.loginError);
          }
        } catch (error) {
          this.loginError = true;
          console.log(error);

        }
      }
    }
  }

}