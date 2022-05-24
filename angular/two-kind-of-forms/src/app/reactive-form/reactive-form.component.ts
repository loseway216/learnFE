import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  // heroForm = new FormGroup({
  //   id: new FormControl(undefined),
  //   name: new FormControl(''),
  //   power: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //   }),
  //   array: new FormArray([
  //     new FormGroup({
  //       field1: new FormControl(''),
  //       field2: new FormControl(''),
  //     }),
  //   ]),
  // });

  heroForm = this.fb.group({
    name: ['', Validators.required],
    power: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
    }),
    lessons: this.fb.array([]),
  });

  get lessons() {
    return this.heroForm.controls['lessons'] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required],
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(index: number) {
    this.lessons.removeAt(index);
  }

  newHero() {
    this.heroForm.setValue({ name: '', alterEgo: '', power: '' });
  }

  updateParts() {
    this.heroForm.patchValue({ name: 'LZW', address: { city: 'Nanjing' } });
  }

  onSubmit() {
    console.log(this.heroForm.value);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
