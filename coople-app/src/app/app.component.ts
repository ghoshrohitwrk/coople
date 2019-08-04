import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coople-app';
  addressList: Array<string> = [];
  public form: FormGroup;
  public fullNameFieldError: string;
  public addressFieldError: string;
  public zipCodeFieldError: string;
  public countryFieldError: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      zipcode: [null, [Validators.required, Validators.maxLength(5)]],
      country: [null, [Validators.required]],
  });

  }

  onFormSubmit() {
    if (this.form.valid) {
      const formObj = this.form.getRawValue();
      const serializedForm = JSON.stringify(formObj);
      console.log(serializedForm);
      this.addressList.push(JSON.parse(serializedForm));
      console.log(this.addressList);
    } else {
      this.generateErrorSummary();
    }
  }
  setfullNameFieldError() {
    if (this.form.controls.fullName.invalid) {
      this.fullNameFieldError = 'Please enter a valid full name';
    } else {
      this.fullNameFieldError = '';
    }
  }

  setaddressFieldError() {
    if (this.form.controls.address.invalid) {
      this.addressFieldError = 'Please enter a street address.';
    } else {
      this.addressFieldError = '';
    }
  }

  setzipCodeFieldError() {
    if (this.form.controls.zipcode.invalid) {
      this.zipCodeFieldError = 'Please enter a zipcode';
    } else {
      this.zipCodeFieldError = '';
    }
  }

  setcountryFieldError() {
    if(this.form.controls.country.invalid) {
      this.countryFieldError = 'Please select a country';
    } else {
      this.countryFieldError = '';
    }
  }

  generateErrorSummary() {
    this.setfullNameFieldError();
    this.setaddressFieldError();
    this.setzipCodeFieldError();
    this.setcountryFieldError();
  }
}
