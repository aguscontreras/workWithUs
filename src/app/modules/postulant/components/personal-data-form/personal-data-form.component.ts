import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
})
export class PersonalDataFormComponent implements OnInit {
  resumeForm: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.resumeForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        nombre: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        documento: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
      }),
      contactInfo: this.formBuilder.group({
        telefono: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      adress: this.formBuilder.group({
        direccion: ['', Validators.required],
        provincia: ['', Validators.required],
        localidad: ['', Validators.required],
        postal: ['', Validators.required],
      }),
    });
  }

  get f() {
    return this.resumeForm.controls;
  }

  get personalInfo() {
    return (this.resumeForm.get('personalInfo') as FormGroup).controls;
  }

  get contactInfo() {
    return (this.resumeForm.get('contactInfo') as FormGroup).controls;
  }

  get adress() {
    return (this.resumeForm.get('adress') as FormGroup).controls;
  }

  limitCharactersPostal(value: string | number): void {
    const newValue = String(value).slice(0, 4);
    this.f.adress.get('postal').setValue(+newValue);
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.resumeForm);
    console.log(this.resumeForm.value);
  }
}
