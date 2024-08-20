import { Injectable } from "@angular/core";
import * as storageUtil from '../utility/storage.utility';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class RsbLookupModel {
    customerId: string;
    loggedUser: any;

    propertyInfo: any;
    propertyCategoryList: Array<any> = [];
    propertyCountry: any;
    authToken: string;
    vendorPropertyInfo: any;
    mobileTypeStatus: any;
    categoryList: Array<any> = [];
    selectedCountry: any;
    profileDisplayType: any;
    deviceUuid: string;
    countryList: Array<any> = [];
    currentPosition: any;
    currentPositionAddress: any;
    redirection : any;
    moduleList: Array<any> = [];
    selectedModule: any;
    selectedCategory: any;
    selectedSubCategory: any;
    selectedModuleId:any;
    selectedCity: any;
    selectedLocality: any;
    basicAttributeValues: any;
    isBrowser: boolean;
    currentLocationCountry: string;
    redirectRoute:string;
    loginSubscription: BehaviorSubject<any> = new BehaviorSubject(false);
    setCurrentLocationUsingIp:any;
    setCompany:any;
    listingId:any;
    paymentArguments: any;
    companyId:string;
    moduleId:String[] = [];
    selectedListingsId:String[] = [];
    pgAmenities:Array<any>;
    paymentStatusDetails: any;
    private _selectedSubList: string[] = [];
    setCompanyId(id:string):void {
        this.companyId = id;
    }
    getCompanyId(): string {
        return this.companyId;
    }

    setAmenites(amenities:Array<any>):void {
        this.pgAmenities = amenities;
    }
    getAmenities():Array<any> {
        return this.pgAmenities;
    }
     setCurrentLocation(loc:any):void {
        this.setCurrentLocationUsingIp = loc
    }

    getCurrentLocation(): any {
        return this.setCurrentLocationUsingIp;
    }


    setRedirectRoute(route:string): void {
        this.redirectRoute = route
    }

    getRedirectRoute(): any {
        return this.redirectRoute;
    }
    setCustomerId(id: string): void {
        this.customerId = id;
    }

    getCustomerId(): string {
        if (!this.customerId) {
            this.getLoggedUser();
        }
        return this.customerId;
    }
    setSelectedModuleId(id:any){
        this.selectedModuleId=id;

    }
    getSelectedModuleId(){
        return this.selectedModuleId;
        
    }


    setLoggedUser(user: any): void {
        this.loggedUser = user;
        storageUtil.setValueToStorage('user', user, 'JSON', 'session');
        if (user.customerId) {
            this.setCustomerId(user.customerId);
        }
    }

    getLoggedUser(): any {
        if (this.loggedUser) {
            return this.loggedUser;
        } else {
            let user = storageUtil.getValueFromStorage('user', 'JSON', 'session');
            if (user) {
                this.setLoggedUser(user);
                return this.loggedUser;
            } else {
                return null;
            }
        }
    }

    getLoggedUserPersonalDetails(): any {
        let user = this.getLoggedUser();
        if (user && user.personalDetails) {
            return user.personalDetails;
        } else {
            return null;
        }
    }

    setPaymentArguments(data: any): void {
        this.paymentArguments = data;
    }
    getPaymentArguments(): any {
        return this.paymentArguments;
    }

    clearLoggedUser(): void {
        this.loggedUser = null;
        this.customerId = '';
        storageUtil.removeItemFromStorage('user', 'session');
        this.setToken(null);
    }

    setProfileDisplayType(status: Number): void {
        this.profileDisplayType = status;
    }

    getProfileDisplayType(): any {
        if (this.profileDisplayType === undefined && this.loggedUser) {
            this.profileDisplayType = this.loggedUser.activeStatus;
        }
        return this.profileDisplayType;
    }
    setSelectedPropListingIDs(listingIDs:any){
        this.selectedListingsId=listingIDs;

    }
    getSelectedPropListingIDs(){
        return this.selectedListingsId;

    }


    setToken(token: string): void {
        if (token) {
            storageUtil.setValueToStorage('customerToken', token, 'string');

        } else {
            storageUtil.removeItemFromStorage('customerToken');
        }
        this.authToken = token;
    }

    getToken(): string {
        if (this.authToken) {
            return this.authToken;
        } else {
            const val = storageUtil.getValueFromStorage('customerToken', 'string');
            if (val) {
                this.authToken = val;
                return val;
            } else {
                return null;
            }
        }
    }

    setRedirection(redirect: any): void {
        this.redirection = redirect;
    }

    getRedirection(): any {
        return this.redirection;
    }
    setModuleId(id:any):void{
    this.moduleId=id;
    }
    getModuleId():any{
        return this.moduleId;

    }


    setCountry(country: any): void {
        this.selectedCountry = country;
    }

    getCountry(): any {
        return this.selectedCountry;
    }

    setCountryList(list: Array<any>): void {
        this.countryList = list;
    }
    setlistingId(id:any):void{
        this.listingId=id
    }
    getlistingId(){
        return this.listingId;
    }

    getCountryList(): Array<any> {
        return this.countryList;
    }

    setCurrentPosition(position: any): void {
        this.currentPosition = position;
        if (position) {
            storageUtil.setValueToStorage('currentPosition', position, 'string');

        } else {
            storageUtil.removeItemFromStorage('currentPosition');
        }
    }

    getCurrentPosition(): any {
        if (this.currentPosition) {
            return this.currentPosition;
        } else {
            const val = storageUtil.getValueFromStorage('currentPosition', 'JSON');
            if (val) {
                this.setCurrentPosition(val);
                return val;
            } else {
                return null;
            }
        }
    }
 

    setPositionAddress(address: any): void {
        this.currentPositionAddress = address;
        if (address) {
            storageUtil.setValueToStorage('currentPositionAddress', address, 'string');

        } else {
            storageUtil.removeItemFromStorage('currentPositionAddress');
        }
    }

    getPositionAddress(): any {
        if (this.currentPositionAddress) {
            return this.currentPositionAddress;
        } else {
            const val = storageUtil.getValueFromStorage('currentPositionAddress', 'JSON');
            if (val) {
                this.setPositionAddress(val);
                return val;
            } else {
                return null;
            }
        }
    }

    setProperty(property: any): void {
        this.propertyInfo = property;
        if (property) {
            storageUtil.setValueToStorage('property', property, 'JSON');
        } else {
            storageUtil.removeItemFromStorage('property');
        }
    }

    getProperty(): any {
        if (this.propertyInfo) {
            return this.propertyInfo;
        }
        else {
            let property = storageUtil.getValueFromStorage('property', 'JSON');
            if (property) {
                this.setProperty(property);
                return this.propertyInfo;
            } else {
                return null;
            }
        }
    }

    setBuilderCompany(company:any): void {
        this.setCompany = company;
    }

    getBuilderCompany(): any {
        return this.setCompany;
    }

    setVendorProperty(property: any): void {
        this.vendorPropertyInfo = property;
        if (property) {
            storageUtil.setValueToStorage('vendor-property', property, 'JSON');
        } else {
            storageUtil.removeItemFromStorage('vendor-property');
        }
    }

    setPaymentStatus(data: any): void {
        if (data) {
            this.paymentStatusDetails = data;
            storageUtil.setValueToStorage('P_STATUS', data, 'JSON', 'session');
        } else {
            this.paymentStatusDetails = null;
            storageUtil.removeItemFromStorage('P_STATUS', 'session');
        }
    }
    getPaymentStatus(): any {
        if (this.paymentStatusDetails) {
            return this.paymentStatusDetails
        } else {
            let payStatus = storageUtil.getValueFromStorage('P_STATUS', 'JSON', 'session');
            if (payStatus) {
                this.paymentStatusDetails = payStatus;
                return payStatus;
            } else {
                return null;
            }
        }

    }

    getVendorProperty(): any {
        if (this.vendorPropertyInfo) {
            return this.vendorPropertyInfo;
        }
        else {
            let property = storageUtil.getValueFromStorage('vendor-property', 'JSON');
            if (property) {
                this.setVendorProperty(property);
                return this.vendorPropertyInfo;
            } else {
                return null;
            }
        }
    }

    setMobileType(status: Number): void {
        this.mobileTypeStatus = status;
    }
    getMobileType(): any {
        return this.mobileTypeStatus
    }

    setPropertyCountry(country: any): void {
        this.propertyCountry = country;
    }

    getPropertyCountry(): any {
        return this.propertyCountry;
    }

    setPropertyCategoryList(list: Array<any>): void {
        this.propertyCategoryList = list;
    }

    getPropertyCategoryList(): Array<any> {
        return this.propertyCategoryList;
    }

    setModuleList(list: Array<any>): void {
        this.moduleList = list;
    }

    getModuleList(): Array<any> {
        return this.moduleList;
    }

    setModule(module: any): void {
        this.selectedModule = module;
    }

    getModule(): any {
        return this.selectedModule;
    }

    setCategoryList(list: Array<any>): void {
        this.categoryList = list;
    }

    getCategoryList(): Array<any> {
        return this.categoryList;
    }

    
    setUuid(uuid: string): void {
        this.deviceUuid = uuid;
    }

    getUuid(): string {
        return this.deviceUuid;
    }

    setCategory(category: any): void {
        this.selectedCategory = category;
    }

    getCategory(): any {
        return this.selectedCategory
    }

    setSubCategory(subCat: any): void {
        this.selectedSubCategory = subCat;
    }

    getSubCategory(): any {
        return this.selectedSubCategory
    }

    setCity(city: any): void {
        this.selectedCity = city;
    }

    getCity(): any {
        return this.selectedCity;
    }

    setLocality(locality: any): void {
        this.selectedLocality = locality;
    }

    getLocality(): any {
        return this.selectedLocality;
    }

    setBasicValues(val: any): void {
        this.basicAttributeValues = val;
    }

    getBasicValues(): any {
        return this.basicAttributeValues;
    }

    setLocationCountry(country: string): void {
        this.currentLocationCountry = country;
        storageUtil.setValueToStorage('country', country);
    }

    getLocationCountry(): string {
        if(this.currentLocationCountry) {
            return this.currentLocationCountry;
        } else {
            const country = storageUtil.getValueFromStorage('country');
            if(country) {
                this.currentLocationCountry = country;
                return this.currentLocationCountry;
            } else {
                return null;
            }
        }
    }

    set selectedSubCatList(list: string[]) {
        this._selectedSubList = list;
    }

    get selectedSubCatList(): string[] {
        return this._selectedSubList;
    }
}