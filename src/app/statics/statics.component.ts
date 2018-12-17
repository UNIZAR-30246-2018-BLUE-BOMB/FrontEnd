import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

interface TableRow{
    date: String,
    ie: Number
}

interface TableHeader{
  date: String,
  ie: String
}

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {

  shortenID: String = "";

  dataSource = new MatTableDataSource<Object>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Table config
   */
  columnsNames: TableHeader = {date:"Fecha", ie: "Internet Explorer"} // Name of different columns of the table
  tableData: Array<TableRow>; // Data to display on the table
  columnsIDs: Array<String> = ['date', 'ie']; // ID of different columns of the table, this make a relation between columnNames and displayedData

  /**
   * Forms config
   */
  startDateInput = new FormControl(new Date(), Validators.required);
  endDateInput = new FormControl(new Date(), Validators.required);
  maxDateStart = new Date();
  minDateEnd = new Date();
  maxDateEnd  =  new Date();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    this.startDateInput.setValue(startDate);
    this.minDateEnd = startDate;
    this.shortenID = this.route.snapshot.paramMap.get('id');
    if(!this.shortenID){
      this.shortenID = "";
    }
    this.changeTableSearchParameter(this.startDateInput.value, this.endDateInput.value, this.shortenID);
    this.dataSource.paginator = this.paginator;
    this.startDateInput.valueChanges.subscribe(val => {
      this.changeTableSearchParameter(val, this.endDateInput.value, this.shortenID);
      this.minDateEnd = val;
    });

    this.endDateInput.valueChanges.subscribe(val => {
      this.changeTableSearchParameter(this.startDateInput.value, val, this.shortenID);
      this.maxDateStart = val;
    });
  }

  applyFilter(filterValue: string) {
    this.shortenID=filterValue;
    this.changeTableSearchParameter(this.startDateInput.value, this.endDateInput.value, this.shortenID);
  }

  getDifferentParameters(){
    
  }

  changeTableSearchParameter(dateStart:Date, dateEnd:Date, parameter : String){
    // TODO:
    console.log(dateStart);
    console.log(dateEnd);
    console.log(parameter);
    this.tableData = [
      {
        date: '11/12/2018',
        ie: 80
      },
      {
        date: '12/12/2018',
        ie: 80
      },
      {
        date: '11/12/2018',
        ie: 80
      },
      {
        date: '12/12/2018',
        ie: 80
      },
      {
        date: '11/12/2018',
        ie: 80
      },
      {
        date: '12/12/2018',
        ie: 80
      },
      {
        date: '11/12/2018',
        ie: 80
      },
      {
        date: '12/12/2018',
        ie: 80
      }
    ];

    this.dataSource.data = this.tableData;
  }

}
