import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../environments/environment';

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

  shortenID: String = '';

  dataSourceOS = new MatTableDataSource<TableRow>();
  @ViewChild(MatPaginator) paginatorOS: MatPaginator;

  dataSourceBrowser = new MatTableDataSource<TableRow>();
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

  constructor(private route: ActivatedRoute, private http: HttpClient, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    this.startDateInput.setValue(startDate);
    this.minDateEnd = startDate;
    this.shortenID = this.route.snapshot.paramMap.get('id');
    if (!this.shortenID) {
      this.shortenID = '';
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

    this.getAllOS(() => {
      this.changeOSData(this.startDateInput.value, this.endDateInput.value, this.shortenID, () => {
        this.dataSourceOS.data = this.tableDataOS;
      });
    });
    this.getAllBrowsers(() => {
      this.changeBrowserData(this.startDateInput.value, this.endDateInput.value, this.shortenID, () => {
        this.dataSourceBrowser.data = this.tableDataBrowser;
      });
    });
  }

  applyFilter(filterValue: string) {
    this.shortenID = filterValue;
    this.changeTableSearchParameter(this.startDateInput.value, this.endDateInput.value, this.shortenID);
  }

  getAllBrowsers(onFinish: () => void) {
    this.http.get(environment.backEndURI + '/browser/support').subscribe(data => {
      let browsers = [];
      if (data instanceof Array) {
        browsers = data.map(v => v.agent);
      }
      browsers.unshift('Fecha');
      this.columnsNamesBrowser = browsers;
      onFinish();
    }, ignore =>{
      this.snackBar.open('Ha fallado la conexión con el back-end', null, {
        duration: 3000
      });
    });
  }

  getAllOS(onFinish: () => void) {
    this.http.get(environment.backEndURI + '/os/support').subscribe(data => {
      let browsers = [];
      if (data instanceof Array) {
        browsers = data.map(v => v.agent);
      }
      browsers.unshift('Fecha');
      this.columnsNamesOS = browsers;
      onFinish();
    }, ignore =>{
      this.snackBar.open('Ha fallado la conexión con el back-end', null, {
        duration: 3000
      });
    });
  }

  getElement(tr: TableRow, elementName: string): String {
    if (elementName === 'Fecha') {
      return tr.date;
    } else {
      const actual = tr.data.get(elementName);
      if (!actual) {
        return Number(0).toString();
      } else {
        return Number(actual).toString();
      }
    }
  }

  private formatDate(date: Date): String {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }


    return [year, month, day].join('-');
  }

  changeOSData(dateStart: Date, dateEnd: Date, sequence: String, onFinish: () => void) {
    // Clear the previous data
    this.tableDataOS = [];

    if (!sequence || sequence === '') {
      onFinish();
      return;
    }

    const startDateString = this.formatDate(dateStart);
    const dateEndString = this.formatDate(dateEnd);

    const path_to_search = environment.backEndURI + '/' + sequence
      + '/stats/os/daily?maxAmountOfDataToRetrieve=200&&startDate=' + startDateString
      + '&&dateEnd=' + dateEndString;

    this.http.get(path_to_search).subscribe(data => {
      if (data instanceof Array) {
        data.forEach(value => {
          const newRow: TableRow = new TableRow();
          newRow.date = value.day;
          newRow.data = new Map<string, Number>();
          value.clickStat.forEach(statValue => {
            newRow.data.set(statValue.agent, statValue.clicks);
          });
          this.tableDataOS.push(newRow);
        });
      }
      onFinish();
    }, ignore => {
      onFinish();
    });
  }

  changeBrowserData(dateStart: Date, dateEnd: Date, sequence: String, onFinish: () => void) {
    // Clear the previous data
    this.tableDataBrowser = [];

    if (!sequence || sequence === '') {
      onFinish();
      return;
    }

    const startDateString = this.formatDate(dateStart);
    const dateEndString = this.formatDate(dateEnd);

    const path_to_search = environment.backEndURI + '/' + sequence
      + '/stats/browser/daily?maxAmountOfDataToRetrieve=200&&startDate=' + startDateString
      + '&&dateEnd=' + dateEndString;

    this.http.get(path_to_search).subscribe(data => {

      if (data instanceof Array) {
        data.forEach(value => {
          const newRow: TableRow = new TableRow();
          newRow.date = value.day;
          newRow.data = new Map<string, Number>();
          value.clickStat.forEach(statValue => {
            newRow.data.set(statValue.agent, statValue.clicks);
          });

          this.tableDataBrowser.push(newRow);
        });
      }
      onFinish();
    }, ignore => {
      onFinish();
    });
  }

  changeTableSearchParameter(dateStart: Date, dateEnd: Date, parameter: String) {
    this.changeOSData(dateStart, dateEnd, parameter, () => {
      this.dataSourceOS.data = this.tableDataOS;
    });
    this.changeBrowserData(dateStart, dateEnd, parameter, () => {
      this.dataSourceBrowser.data = this.tableDataBrowser;
    });
  }
}
