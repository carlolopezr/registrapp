import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  fecha=Date.now();
  constructor(private platform:Platform) { }

  ngOnInit() {
    this.platform.keyboardDidShow.subscribe(() => {
      (window.document.querySelector('ion-footer') as HTMLElement).classList.add('hide');
      // Do something with the keyboard height such as translating an input above the keyboard.
    });

    this.platform.keyboardDidHide.subscribe(() => {
      (window.document.querySelector('ion-footer') as HTMLElement).classList.remove('hide');
    });
  }
}