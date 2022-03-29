import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  addBrandForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addBrandForm = this.formBuilder.group({
      name: this.formBuilder.control("", [Validators.required])
    });
  }

  save() {
    if (this.addBrandForm.valid) {
      let brand: Brand = this.addBrandForm.value as Brand;
      this.brandService.addBrand(brand).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success("New brand is added.", "Success!");
          this.router.navigate(["brands"]);
        },
        error: (errorResponse) => {
          console.error(errorResponse);
          if (errorResponse.error.Errors.length > 0) {
            for (const error of errorResponse.error.Errors) {
              this.toastr.error(error.ErrorMessage, "Error!");
            }
          }
        }
      });
    }
    else {
      this.toastr.warning("Please fill the field.", "Warning!");
    }
  }
}
