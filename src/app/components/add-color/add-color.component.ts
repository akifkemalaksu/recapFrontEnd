import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {
  addColorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private colorService: ColorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addColorForm = this.formBuilder.group({
      name: this.formBuilder.control("", [Validators.required])
    });
  }

  save() {
    if (this.addColorForm.valid) {
      let color: Color = this.addColorForm.value as Color;
      this.colorService.addColor(color).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success("New color is added.", "Success!");
          this.router.navigate(["colors"]);
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
