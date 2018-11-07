import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';

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
  endPicker = new FormControl(new Date(), Validators.required);

  constructor() { }

  ngOnInit() {
    this.changeTableSearchParameter();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
  }

  changeTableSearchParameter(){
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
