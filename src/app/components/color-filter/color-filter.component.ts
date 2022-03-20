import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-color-filter',
  templateUrl: './color-filter.component.html',
  styleUrls: ['./color-filter.component.css']
})
export class ColorFilterComponent implements OnInit {
  colors: Color[] = [];
  activeOption?: number;

  constructor(private colorService: ColorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetColors();
  }

  GetColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  async onChange(e: any) {
    let queryParams: any = {};

    let colorId = e.target.value;
    if (colorId) {
      queryParams["colorId"] = colorId;
    }
    this.activeOption = colorId;

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
