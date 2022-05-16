import {Component, Input, OnInit} from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @Input() User: any;

  constructor(private router: Router) {

  }
  onSubmit(){
    sessionStorage.removeItem('api_key');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    let firstname=sessionStorage.getItem('firstname')
    let lastname=sessionStorage.getItem('lastname')
    if(firstname&&lastname){
      this.User= firstname+" "+ lastname
    }

}
}
