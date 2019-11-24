import { Component, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { Lesson, StudentLevel } from './lesson';
import 'rxjs/Rx';
import { validateDuration } from './validateDuration';

@Component({
  selector: 'app',
  templateUrl: 'template.html'
})
export class App {
  myForm: FormGroup;

  duration = new FormControl(10, [validateDuration]);

  lesson = new Lesson(
    'Title goes here',
    0,
    'Description goes here',
    'Transcript goes here',
    StudentLevel.BEGINNER
  );

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      title: ['This is the title', [Validators.minLength(5)]],
      duration: this.duration,
      description: ['description goes here', [Validators.required]]
    });

    this.myForm.valueChanges
      .filter(() => this.myForm.valid)
      .map(
        value =>
          new Lesson(
            value.title,
            value.duration,
            value.description,
            '',
            StudentLevel.BEGINNER
          )
      )
      .do(formValue => console.log('Valid Form Value:', formValue))
      .subscribe(lesson => (this.lesson = lesson));
  }

  partialUpdate() {
    this.myForm.patchValue({
      title: 'Set Form Values',
      duration: 5
    });
  }

  fullUpdate() {
    this.myForm.setValue({
      title: 'Set Form Values',
      description: 'new description'
    });
  }

  reset() {
    this.myForm.reset();
  }
}

@NgModule({
  declarations: [App],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [App]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
