import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fullName') fullNameInput: ElementRef;
  @ViewChild('address') addressInput: ElementRef;
  @ViewChild('zipcode') zipcodeInput: ElementRef;
  @ViewChild('country') countryInput: ElementRef;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      zipcode: [null, [Validators.required, Validators.maxLength(6)]],
      country: [null, [Validators.required]],
  });

  }

  onFormSubmit() {
    if (this.form.valid) {
      const formObj = this.form.getRawValue();
      const serializedForm = JSON.stringify(formObj);
      console.log(serializedForm);
      this.addressList.push(JSON.parse(serializedForm));
      this.form.reset();
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

  editAddress( event: any) {
    event.preventDefault();
    alert(event.target.id);
    const index = event.target.id;
    // this.addressList.push(JSON.parse(serializedForm));
    this.addressList.forEach(function(addressList, index) {
      console.log(index);
      this.fullNameInput.value = this.addressList.fullName;
      this.addressInput.value = this.addressList.address;
      this.zipcodeInput.value = this.addressList.zipcode;
      this.countryInput.value = this.addressList.country;

    });
  }
}
