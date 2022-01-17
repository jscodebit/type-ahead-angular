import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, merge, pipe, takeUntil } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { debounceTime, Observable, OperatorFunction } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClientService } from 'src/services/http-client.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

export interface Patient{
  id: number, 
  lastName: number,
  firstName: string,
  fullName: string
}

@Component({
  selector: 'app-ngbd-typeahead-format',
  templateUrl: './ngbd-typeahead-format.component.html',
  styleUrls: ['./ngbd-typeahead-format.component.css']
})

export class NgbdTypeaheadFormatComponent implements OnInit {

  public model: any;
  clickedItem:string = '';
  patientsFullNames : string[] = [];
  allPatientsDetails : Patient[] = [];
  resultSet : Patient[] = [];
  historySearch : Patient[] = [];

  formatter = (result: string) => result.toUpperCase();

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  
  private ngUnSubscribe = new Subject();

  searching = false;
  searchFailed = false;

  search: OperatorFunction<string, string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(400), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    this.fetchAllPatientsDetails();

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term: string) => {
        if(term === ''){
          return this.patientsFullNames
        } else {
          this.resultSet = this.allPatientsDetails.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          this.historySearch.push(...this.resultSet);
          //return this.patientsFullNames.filter(ele => ele.includes(term))
          return this.resultSet.map(ele => ele.fullName);
        }
      }));
  }

  private fetchAllPatientsDetails(){
    this.httpClientService.getAllPatientsDetails()
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(response => {
      this.allPatientsDetails = response;
      this.patientsFullNames = this.allPatientsDetails.map((ele: any) => ele['fullName']);
    });  
  }

  selectedItem(item: any){
    this.clickedItem=item.item;
    console.log(item);
  }

  constructor(fb: FormBuilder, private httpClientService: HttpClientService) { 
    
  }

  ngOnInit(): void {
  }

}
