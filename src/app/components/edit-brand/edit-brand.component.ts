import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  editBrandForm: FormGroup;
  brand: Brand;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.brandService.getBrand(params["brandId"] as number).subscribe(response => {
          this.brand = response.data;
          this.createForm();
        });
      }
      else {
        this.toastr.warning("Url must contain the brandId.", "Warning!");
      }
    });
  }

  createForm() {
    this.editBrandForm = this.formBuilder.group({
      id: this.formBuilder.control(this.brand?.id),
      name: this.formBuilder.control(this.brand?.name, [Validators.required])
    });
  }

  save() {
    if (this.editBrandForm.valid) {
      if (confirm("Are you sure you want to save the changes?")) {
        let brand: Brand = this.editBrandForm.value as Brand;
        this.brandService.editBrand(brand).subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success("New brand is edited.", "Success!");
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
    }
    else {
      this.toastr.warning("Please fill the field.", "Warning!");
    }
  }
}
