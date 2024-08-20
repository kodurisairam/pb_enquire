import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RsbLookupModel } from 'src/app/common/model/rsb-lookup.model';
import { RsbService } from 'src/app/service/rsb.service';

@Component({
  selector: 'app-header-for-search-properties',
  templateUrl: './header-for-search-properties.component.html',
  styleUrls: ['./header-for-search-properties.component.css']
})
export class HeaderForSearchPropertiesComponent implements OnInit {
  selectedModule: any;
  selectedCategory: any;
  selectedSubCats: string[] = [];
  categoryList: Array<any> = [];
  typePG = false;
  subCatFullList: Array<any> = [];
  selectedCountry: any;
  moduleList: any;
  selectedModuleId: any;
  routerSubscription: Subscription;
  showHeaderForRentSearch: boolean = false;
  showHeaderForProjectSearch: boolean = false;
  showHeaderForPgHostelsSearch: boolean = false;

  constructor(
    private router: Router,
    public lookupModel: RsbLookupModel,
    private rsbService: RsbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        console.log('Current URL:', url);
        this.showHeaderForRentSearch = event.url.indexOf('/listings/') !== -1;
        this.showHeaderForProjectSearch = event.url.indexOf('/project/') !== -1;
        this.showHeaderForPgHostelsSearch = event.url.indexOf('/pg/') !== -1;
      }
    });
    this.route.queryParams.subscribe(params => {
      const paramsModuleId = params['module'];
      const moduleList = this.lookupModel.getModuleList();
      const equalModuleID = moduleList.find((module: any) => module.moduleId.includes(paramsModuleId));

      if (equalModuleID) {
        this.selectedModuleId = equalModuleID.moduleId;
      }
    });
    this.selectedCountry = this.lookupModel.getCountry();
    this.selectedModule = this.lookupModel.getModule() ? this.lookupModel.getModule() : { moduleId: this.selectedCountry.moduleId ,moduleName:"Rent"};
    
  }

  backToSearchProp(): void {
    this.router.navigate(['searchProp']);
  }

  selectModule(module: any): void {
    // alert(JSON.stringify(module));
    this.selectedModule = module;
    this.selectedCategory = "";
    this.selectedSubCats = [];
    this.lookupModel.setModule(module);
  }

  getIcon(val: string): string {
    switch (val) {
      case 'Rent':
        return 'bi bi-house-door';
      case 'Buy':
        return 'bi bi-house-check';
      case 'Projects':
        return 'bi bi-file-earmark-text';
      case 'PG / Hostel':
        return 'bi bi-layers-half';
      case 'Plot & Land':
        return 'bi bi-buildings';
      case 'Commercial':
        return 'bi bi-buildings';
      default:
        return '';
    }
  }
}
