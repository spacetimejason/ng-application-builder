import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'myapp',
  template: `<div>MyApp</div>`,
  standalone: false,
})
class AppComponent {
}

@NgModule({
})
export class AppModule {
  declarations: [AppComponent],  
  bootstrap: [AppComponent],
}
