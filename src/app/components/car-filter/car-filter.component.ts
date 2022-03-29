import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  activeBrand?: number;
  activeColor?: number;
  constructor(private brandService: BrandService, private colorService: ColorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetBrands();
    this.GetColors();
  }

  GetBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  GetColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  async brandOnChange(e: any) {
    let queryParams: any = {};

    let brandId = e.target.value;
    if (brandId) {
      queryParams["brandId"] = brandId;
    }
    this.activeBrand = brandId;

    await this.activatedRoute.queryParams.subscribe(params => {
      if (params["colorId"]) {
        queryParams["colorId"] = params["colorId"];
      }
    });

    this.router.navigate(['/cars'], {
      queryParams: queryParams
    });
  }

  async colorOnChange(e: any) {
    let queryParams: any = {};

    let colorId = e.target.value;
    if (colorId) {
      queryParams["colorId"] = colorId;
    }
    this.activeColor = colorId;

    await this.activatedRoute.queryParams.subscribe(params => {
      if (params["brandId"]) {
        queryParams["brandId"] = params["brandId"];
      }
    });

    this.router.navigate(['/cars'], {
      queryParams: queryParams
    });
  }
}
