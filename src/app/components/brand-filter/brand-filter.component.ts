import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.css']
})
export class BrandFilterComponent implements OnInit {
  brands: Brand[] = [];
  activeOption?:number;
  constructor(private brandService: BrandService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetBrands();
  }
  GetBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  async onChange(e: any) {
    let value = e.target.value ?? '';
    this.activeOption = value;
    let colorId: string = '';
    await this.activatedRoute.params.subscribe(params => {
      colorId = params["colorId"] ?? '';
    });
    this.router.navigate(['cars', value, colorId]);
  }
}