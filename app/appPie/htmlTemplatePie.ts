/**
 * Created by adin1 on 2017/2/28.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'htmlTemplate'})
export class HtmlTemplatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){

  }
  transform(_html:string,_data:any): any {
   return '';
  }
}
