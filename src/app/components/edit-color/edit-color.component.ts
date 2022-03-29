import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.css']
})
export class EditColorComponent implements OnInit {
  editColorForm: FormGroup;
  color: Color;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.colorService.getColor(params["colorId"] as number).subscribe(response => {
          this.color = response.data;
          this.createForm();
        });
      }
      else {
        this.toastr.warning("Url must contain the colorId.", "Warning!");
      }
    });
  }

  createForm() {
    this.editColorForm = this.formBuilder.group({
      id: this.formBuilder.control(this.color?.id),
      name: this.formBuilder.control(this.color?.name, [Validators.required])
    });
  }

  save() {
    if (this.editColorForm.valid) {
      if (confirm("Are you sure you want to save the changes?")) {
        let color: Color = this.editColorForm.value as Color;
        this.colorService.editColor(color).subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success("New color is edited.", "Success!");
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
    }
    else {
      this.toastr.warning("Please fill the field.", "Warning!");
    }
  }
}
