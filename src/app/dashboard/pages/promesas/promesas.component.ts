import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './promesas.component.html',
  styleUrls: [ './promesas.component.css' ],
})
export class PromesasComponent implements OnInit {


  ngOnInit(): void {
    this.getUsuarios()
      .then(usuarios => {
        console.log(usuarios);
      });
  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
  }
}
