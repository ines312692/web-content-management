import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstChar",
  pure: true,
  standalone: true
})
export class FirstCharPipe implements PipeTransform {
  transform(value: string): string {
    return value.length ? value.charAt(0) : "";
  }
}
