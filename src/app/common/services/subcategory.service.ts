import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  selectedSubCategories: any[] = [];

  constructor() { }

  toggleSelection(subCategory: any) {
    const index = this.selectedSubCategories.findIndex(sc => sc.subCategoryId === subCategory.subCategoryId);
    if (index !== -1) {
      this.selectedSubCategories.splice(index, 1);
    } else {
      this.selectedSubCategories.push(subCategory);
    }
  }
  getSelectedSubCategories(): any[] {
    return this.selectedSubCategories;
  }
  setSelectedSubcategories(value:any):void{
    this.selectedSubCategories=value;
  }

  clearSelection() {
    this.selectedSubCategories = [];
  }
  
}
