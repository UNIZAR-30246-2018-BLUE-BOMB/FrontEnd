import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

class TableRow {
  date: String;
  data: Map<string, Number>;
}

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {

  shortenID: String = "";

  dataSourceOS = new MatTableDataSource<TableRow>();
  @ViewChild(MatPaginator) paginatorOS: MatPaginator;

  dataSourceBrowser= new MatTableDataSource<TableRow>();
  @ViewChild(MatPaginator) paginatorBrowser: MatPaginator;

  /**
   * Table config
   */
  columnsNamesOS: Array<String> = new Array<String>(); // Name of different columns of the table
  tableDataOS: Array<TableRow> = new Array<TableRow>();

  columnsNamesBrowser: Array<String> = new Array<String>(); // Name of different columns of the table
  tableDataBrowser: Array<TableRow> = new Array<TableRow>();

  /**
   * Forms config
   */
  startDateInput = new FormControl(new Date(), Validators.required);
  endDateInput = new FormControl(new Date(), Validators.required);
  maxDateStart = new Date();
  minDateEnd = new Date();
  maxDateEnd = new Date();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    this.startDateInput.setValue(startDate);
    this.minDateEnd = startDate;
    this.shortenID = this.route.snapshot.paramMap.get('id');
    if (!this.shortenID) {
      this.shortenID = "";
    }
    this.changeTableSearchParameter(this.startDateInput.value, this.endDateInput.value, this.shortenID);
    this.dataSourceOS.paginator = this.paginatorOS;
    this.dataSourceOS.paginator = this.paginatorBrowser;
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
    this.shortenID = filterValue;
    this.changeTableSearchParameter(this.startDateInput.value, this.endDateInput.value, this.shortenID);
  }

  getAllBrowsers() {
    // TODO:
    let browsers = ["Fecha", "Chomium", "Firefox", "Internet Explorer", "Edge"];
    this.columnsNamesBrowser = browsers;
  }

  getAllOS() {
    // TODO:
    let os = ["Fecha", "Windows", "Linux", "Mac"];
    this.columnsNamesOS = os;
  }

  getElement(tr: TableRow, elementName: string): String {
    if (elementName == "Fecha") {
      return tr.date;
    } else {
      let actual = tr.data.get(elementName);
      console.log(elementName);
      console.log(tr);
      if (!actual) {
        return (new Number(0)).toString();
      } else {
        return (new Number(actual)).toString();
      }
    }
  }

  changeOSData(dateStart: Date, dateEnd: Date, parameter: String) {
    // TODO:
    let newRow: TableRow = new TableRow();
    newRow.date = '11/12/97';
    newRow.data = new Map<string, Number>();
    newRow.data.set("Windows", 88);
    newRow.data.set("Linux", 88);

    this.tableDataOS.push(newRow);
  }

  changeBrowserData(dateStart: Date, dateEnd: Date, parameter: String) {
    // TODO:
    let newRow: TableRow = new TableRow();
    newRow.date = '11/12/97';
    newRow.data = new Map<string, Number>();
    newRow.data.set("Chomium", 88);
    newRow.data.set("Firefox", 88);

    this.tableDataBrowser.push(newRow);
  }

  changeTableSearchParameter(dateStart: Date, dateEnd: Date, parameter: String) {
    this.getAllOS();
    this.changeOSData(dateStart, dateEnd, parameter);
    this.getAllBrowsers();
    this.changeBrowserData(dateStart, dateEnd, parameter);

    this.dataSourceOS.data = this.tableDataOS;
    this.dataSourceBrowser.data = this.tableDataBrowser;
  }

}
