import { ToastrService } from 'ngx-toastr';
import { Brand } from './../../models/brand';
import { BrandService } from '../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  delete(brand: Brand) {
    if (window.confirm("Are you sure you want to delete the brand?")) {
      this.brandService.deleteBrand(brand.id).subscribe(response => {
        this.toastr.success("The brand is deleted.", "Success!");
        this.getBrands();
      });
    }
  }
}
