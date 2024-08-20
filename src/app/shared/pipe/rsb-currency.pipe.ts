import { Pipe, PipeTransform } from "@angular/core";
import { getCurrencySymbol } from '@angular/common';
import { RsbLookupModel } from 'src/app/common/model/rsb-lookup.model';

@Pipe({
    name: 'rsbcurrency'
})
export class RsbCurrencyPipe implements PipeTransform {
    
    constructor(private lookupModel: RsbLookupModel) {}

    transform(
        value: number,
        currencyCode: string,
    ): string | null {
        const country = this.lookupModel.getCountry();
        const symbol = getCurrencySymbol(currencyCode, 'wide');
        const val = new Intl.NumberFormat(country.locale ? country.locale : 'en-IN').format(value);
        return symbol + ' ' + val;
    }
}