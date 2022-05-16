import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UsersService} from 'src/app/reusables/services/users.service';
import {first} from "rxjs/operators";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title = 'dynamic-translations';
  public loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private auth: UsersService,
              private cookieService: CookieService,
  ) {

    let loginFormControl = {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    };

    this.loginForm = formBuilder.group(loginFormControl);

  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
this.cookieService.set("username",this.f.username.value),
  this.cookieService.set("password",this.f.password.value)
  }

  onSubmit(): void {
    this.auth.getAccountUser(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(value => {
        console.log(value)
          sessionStorage.setItem("firstname", value.user.firstname);
          sessionStorage.setItem("lastname", value.user.lastname);
          sessionStorage.setItem("api_key", value.user.api_key);

        this.router.navigate(['/home'])
      },
        error => {
        alert('verifier username et password ')
        })

  }

}

