import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
  <!-- Make search bar -->
  <div class="container-fluid text-white py-5" style="background-color: #1d2630">
    <h1 class="text-center">Search/Filter Engine</h1>
    <h5 class="text-center">Search Your Query Here</h5>
  </div>
  
  <div class="container col-6 mt-5">
    <input
      type="text"
      class="form-control mb-5 p-3"
      placeholder="Search here..."
      id="search-input"
    />
    <ul class="list-group list-group-flush text-primary h5">
      <li class="list-group-item p-3">Java</li>
      <li class="list-group-item p-3">Python</li>
      <li class="list-group-item p-3">C#</li>
      <li class="list-group-item p-3">Dart</li>
      <li class="list-group-item p-3">JavaScript</li>
      <li class="list-group-item p-3">C++</li>
      <li class="list-group-item p-3">Swift</li>
      <li class="list-group-item p-3">C</li>
    </ul>
  </div>
  `,
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
}
