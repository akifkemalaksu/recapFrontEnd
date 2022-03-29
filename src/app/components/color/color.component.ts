import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];

  constructor(
    private colorService: ColorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  delete(color: Color) {
    if (window.confirm("Are you sure you want to delete the brand?")) {
      this.colorService.deleteColor(color.id).subscribe(response => {
        this.toastr.success("The brand is deleted.", "Success!");
        this.getColors();
      });
    }
  }
}
