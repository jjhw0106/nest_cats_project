import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PoistiveIntPipe implements PipeTransform {
  transform(value: number) {
    console.log(value)
    return value;
  }
}