import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  breeds = [];
  colors = ['Amarelo', 'Azul', 'Verde', 'Vermelho', 'Preto'];
  fonts = ['Arial', 'Helvetica', 'Open Sans', 'Roboto', 'Verdana'];
  dogName: string;
  selectedFont: string;
  selectedColor: string;
  selectedBreed: string;
  dogImg: string;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.http.get('https://dog.ceo/api/breeds/list/all').subscribe((data: any) => {
      for (const key in data.message) {
        if (data.message[key].length) {
          data.message[key].forEach((breed) => {
            this.breeds.push(breed + ' ' + key);
          });
        } else {
          this.breeds.push(key);
        }
      }
    });

    this.getLocalStorage();
  }

  getLocalStorage() {
    this.selectedBreed = window.localStorage.getItem('breed');

    this.dogName = window.localStorage.getItem('dogName');

    this.selectedColor = window.localStorage.getItem('color');

    this.selectedFont = window.localStorage.getItem('font');

    this.dogImg = window.localStorage.getItem('dogImg');
  }

  getColor() {
    if (this.selectedColor) {
      switch (this.selectedColor) {
        case 'Amarelo':
          return 'yellow';

        case 'Azul':
          return 'blue';

        case 'Verde':
          return 'green';

        case 'Vermelho':
          return 'red';

        case 'Preto':
          return 'black';
      }
    }
  }

  getFont() {
    if (this.selectedFont) {
      return this.selectedFont;
    }
  }

  breedChange(value: any) {
    this.selectedBreed = value;

    this.http.get(`https://dog.ceo/api/breed/${value}/images/random`).subscribe((data: any) => {
      this.dogImg = data.message;
    });
  }

  onNameChange(value: string) {
    this.dogName = value;
  }

  colorChange(value: string) {
    this.selectedColor = value;
  }

  fontChange(value: string) {
    this.selectedFont = value;
  }

  submit() {
    if (this.selectedBreed && this.dogName && this.selectedFont && this.selectedColor) {
      window.localStorage.setItem('breed', this.selectedBreed);
      window.localStorage.setItem('dogName', this.dogName);
      window.localStorage.setItem('font', this.selectedFont);
      window.localStorage.setItem('color', this.selectedColor);
      window.localStorage.setItem('dogImg', this.dogImg);

      const now = new Date();
      window.localStorage.setItem('date', (now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear()
        + ' ' + now.getHours() + ':' + now.getMinutes() + 'hrs'));
    }

    this.snackBar.open('Salvo com sucesso!', '', {
      duration: 2000
    });
  }
}
