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
        apellido: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        documento: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
      }),
      contactInfo: this.formBuilder.group({
        codArea: ['', Validators.required],
        telefono: ['', Validators.required],
        codAreaAlt: [''],
        telefonoAlt: [''],
        email: ['', [Validators.required, Validators.email]],
      }),
      adress: this.formBuilder.group({
        calle: [''],
        numero: [''],
        provincia: [''],
        localidad: [''],
        pais: [''],
        postal: [''],
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

  onSubmit(): void {
    this.submitted = true;
    console.log(this.resumeForm);
    console.log(this.resumeForm.value);
    console.log(this.personalInfo);
  }
}
