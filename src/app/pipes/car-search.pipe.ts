import { CarDto } from './../models/Dtos/carDto';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carSearch'
})
export class CarSearchPipe implements PipeTransform {

  transform(value: CarDto[], search: string): CarDto[] {
    search = search ? search.toLocaleLowerCase() : "";
    if (search) {
      value = value.filter((c: CarDto) =>
        c.brandName.toLocaleLowerCase().includes(search) ||
        c.colorName.toLocaleLowerCase().includes(search) ||
        c.description.toLocaleLowerCase().includes(search));
    }
    return value;
  }

}
