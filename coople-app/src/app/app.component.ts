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
  @ViewChild('fullName',{ static: false }) fullNameInput: ElementRef;
  @ViewChild('address', { static: false }) addressInput: ElementRef;
  @ViewChild('zipcode', { static: false }) zipcodeInput: ElementRef;
  @ViewChild('country', { static: false }) countryInput: ElementRef;
  public index: number;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.index);
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
      console.log(this.index);
      if (this.index === undefined || this.index == null || this.index <= 0)
      {
        console.log(serializedForm);
        this.addressList.push(JSON.parse(serializedForm));
        console.log(this.addressList);
        this.form.reset();
      } else {
        
        this.addressList.splice(this.index,this.index);
        this.addressList.push(JSON.parse(serializedForm));
        this.index = null;
        this.form.reset();
      }

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
    this.index = event.target.id;
    const dataList: any = this.addressList[this.index];
    this.fullNameInput.nativeElement.value = dataList.fullName;
    this.addressInput.nativeElement.value = dataList.address;
    this.zipcodeInput.nativeElement.value = dataList.zipcode;
    this.countryInput.nativeElement.value = dataList.country;
    this.setFromToDirty();
  }

  setFromToDirty() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].markAllAsTouched();
    });
  }
}
