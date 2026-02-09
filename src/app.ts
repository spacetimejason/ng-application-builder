import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: "myapp",
  template: `<div>MyApp</div>`,
  standalone: false,
})
class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule],
})
export class AppModule {}
