import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="text-center" style="margin-top:20px;">
      <h1 class="title">Almacén</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
