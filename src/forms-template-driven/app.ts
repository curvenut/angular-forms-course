import { Component, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Lesson } from './lesson';
import { FormsModule } from '@angular/forms';
import { DurationValidator } from './validate-duration.directive';

@Component({
  selector: 'app',
  templateUrl: './app-template.html'
})
export class App {
  lesson = new Lesson();

  createLesson(form) {
    console.log('Lesson Value:', this.lesson, form);
    debugger;
  }

  summaryStatus(summary) {
    return {
      color: !summary.valid && !summary.pristine ? 'red' : 'black'
    };
  }
}

@NgModule({
  declarations: [App, DurationValidator],
  imports: [BrowserModule, FormsModule],
  bootstrap: [App]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
