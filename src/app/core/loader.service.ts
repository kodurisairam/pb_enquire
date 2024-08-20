import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { RsbLookupModel } from '../common/model/rsb-lookup.model';
import { Observable } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { DataService, IServiceMethodMap } from '../common/services/data.service';
import { Message } from '../common/events/message';
import { MessageService, BUS_EVENTS } from '../common/events/message.service';
export const SRV_OPS: IServiceMethodMap = {
    getLocation: {
        method: 'getUserLocationBasedOnPublicIp'
    },
    getActiveCountries: {
        method: 'master/getActiveCountries'
    },
    getActiveModules: {
        method: 'master/getActiveModules'
    },
};

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    geoCoder: any;
    constructor(
        private lookupModel: RsbLookupModel,
        private mapsAPILoader: MapsAPILoader,
        private messageService: MessageService,
        private dataService: DataService,
        @Inject(PLATFORM_ID) platformId: any
    ) {
        this.lookupModel.isBrowser = isPlatformBrowser(platformId);
        if (this.lookupModel.isBrowser) {
            this.mapsAPILoader.load().then(() => {
                this.geoCoder = new google.maps.Geocoder;
            });
        }
    }

   
    getCountry(countryList: Array<any>, address?: any): void {
        let country: any;
        if (address && address.country) {
            country = countryList.find(country => country.twoDigitCountryCode === address.country);
            if (!country) {
                country = countryList.find(country => country.threeDigitCountryCode === address.country);
            }
        }
        if (country) {
            this.lookupModel.setCountry(country);
        }
        else {
            country = countryList.find(item => item.isDefault);
            country = country ? country : countryList[0];
            this.lookupModel.setCountry(country);
        }
        if (address && address.country) {
            this.messageService.sendMessage(new Message(BUS_EVENTS.LOCATION_CHANGE, country.twoDigitCountryCode));
        }

        const args = {
            status: 1,
            countryId: [country.codeId],
            moduleId: country.moduleId
        };
        this.dataService.callPostAPI(SRV_OPS.getActiveModules, args).subscribe((rsp) => {
            if (rsp.statusCode === 0) {
                const moduleList = rsp.contents;
                let module;

                module = moduleList.find(item => item.isDefault);

                this.lookupModel.setModuleList(moduleList);
                this.lookupModel.setModule(module);

            }
        }, (err) => {
            const module = { moduleId: country.moduleId };
            this.lookupModel.setModule(module);

        });

    }

    /*  getAddress(latLng: { lat: number, lng: number }, observer: any) {
          this.geoCoder.geocode({ 'location': latLng }, (results, status) => {
              if (status === 'OK') {
                  let userPositionAddress: any = {};
                  const address = results[0].address_components;
                  const city = address.find(comp => comp.types.indexOf('locality') !== -1)
                  if (city) {
                      userPositionAddress.city = city.long_name;
                  }
                  const country = address.find(comp => comp.types.indexOf('country') !== -1)
                  if (country) {
                      userPositionAddress.country = country.short_name;
                  }
                  const postal_code = address.find(comp => comp.types.indexOf('postal_code') !== -1)
                  if (postal_code) {
                      userPositionAddress.postal_code = postal_code.long_name;
                  }
                  this.lookupModel.setPositionAddress(userPositionAddress);
                  observer.next(userPositionAddress);
                  observer.complete();
              } else {
                  observer.error();
              }
          });
      }
  
      getLocation(): Observable<any> {
          return Observable.create(observer => {
              if (this.lookupModel.isBrowser) {
  
  
                  const getGeoLocation = () => {
                      navigator.geolocation.getCurrentPosition((position) => {
                          const coord = {
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                          };
                          this.getAddress(coord, observer);
                      });
                  };
  
                  (navigator as any).permissions.query({ name: 'geolocation' }).then(function (this, result) {
                      if (result.state == 'granted') {
                          getGeoLocation();
                      } else if (result.state === 'prompt') {
                          getGeoLocation();
                          observer.next();
                      } else {
                          observer.next();
                      }
                      result.onchange = function () {
                          if (result.state == 'granted') {
                              getGeoLocation();
                          }
                      }
                  });
              } else {
                  observer.next();
              }
          });
      }
  
      loadCountries(): Promise<boolean> {
          return new Promise<boolean>((resolve, reject) => {
              this.dataService.callPostAPI(SRV_OPS.getActiveCountries, {}).subscribe((res: any) => {
                  if (res.statusCode === 0 && res.contents) {
                      this.lookupModel.setCountryList(res.contents)
                  }
                  this.getLocation().subscribe(address => {
                      if (address) {
                          this.getCountry(res.contents, address).subscribe(()=> resolve(), () => resolve());
                      } else {
                          this.getCountry(res.contents).subscribe(()=> resolve(), () => resolve());
                      }
                  }, (err) => {
                      this.getCountry(res.contents).subscribe(()=> resolve(), () => resolve());
                  });
              }, (err) => {
                  reject();
              });
          });
      } */

    loadLocation(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            const loadCountryList = (address: { country: string }) => {

                this.dataService.callPostAPI(SRV_OPS.getActiveCountries, {}).subscribe((res: any) => {
                    if (res.statusCode === 0 && res.contents) {
                        this.lookupModel.setCountryList(res.contents);
                        this.getCountry(res.contents, address);
                    }
                    resolve();
                }, (err) => {
                    resolve();
                });
            };

            const location = this.lookupModel.getLocationCountry();
            if (location && this.lookupModel.getCurrentLocation()) {
                loadCountryList({ country: location });
            } else {
                this.dataService.callPostAPI(SRV_OPS.getLocation, {}).subscribe((rsp: any) => {
                    if (rsp.statusCode === 0 && rsp.contents) {
                        const content = rsp.contents;
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                    content.latitude = position.coords.latitude;
                                    content.longitude = position.coords.longitude;
                            });
                        }
                        this.lookupModel.setCurrentLocation(content);
                        this.lookupModel.setLocationCountry(content.country_code);
               
                    }
                    loadCountryList({ country: rsp.contents.country_code });
                });
            }
        });
    }
}