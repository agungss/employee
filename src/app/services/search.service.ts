import { Injectable } from '@angular/core';
import { Search } from '../models/Search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  search: Search = {
    searchBar: '',
  }

  constructor() {
    if(localStorage.getItem('search') != null) {
      // read, need parse
      this.search = JSON.parse(localStorage.getItem('search')!);
    }
  }

  getSearch(): Search {
    return this.search;
  }

  changeSearch(search: Search) {
    // save, need stringify
    localStorage.setItem('search', JSON.stringify(search));
    
    console.log(search);
    
  }
}
