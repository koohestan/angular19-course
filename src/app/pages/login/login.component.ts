
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,
    MatIconModule,MatProgressSpinnerModule,MatSnackBarModule,MatTooltipModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = signal(false);

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.snackBar.open('ورود موفقیت‌آمیز', '', {
              duration: 3000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });
            this.router.navigate(['/dashboard']);
          } else {
            this.snackBar.open('ایمیل یا رمز عبور معتبر نیست', '', {
              duration: 3000,
              horizontalPosition: 'start',
              verticalPosition: 'bottom'
            });
          }
        },
        error: (error) => {
          this.snackBar.open('خطا در ورود به سیستم', '', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          });
        },
        complete: () => {
          this.loading.set(false);
        }
      });

    }
  }
}
