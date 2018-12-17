import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

interface TableRow{
  agent: String,
  views: Number
}

interface TableHeader{
  agent: String,
  views: String
}

@Component({
  selector: 'app-statics-global',
  templateUrl: './statics-global.component.html',
  styleUrls: ['./statics-global.component.css']
})
export class StaticsGlobalComponent implements OnInit {

  shortenID: String = "";

  columnsIDs: Array<String> = ['agent', 'views']; // ID of different columns of the table, this make a relation between columnNames and displayedData

  /**
   * Table by browser config
   */
  dataSourceByBrowser = new MatTableDataSource<Object>();
  columnsNamesByBrowser: TableHeader = {agent:"Navegador", views: "Visitas"} // Name of different columns of the table
  tableDataByBrowser: Array<TableRow>; // Data to display on the table

  /**
   * Table by os config
   */
  dataSourceByOS = new MatTableDataSource<Object>();
  columnsNamesByOS: TableHeader = {agent:"Sistema operativo", views: "Visitas"} // Name of different columns of the table
  tableDataByOS: Array<TableRow>; // Data to display on the table

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.shortenID = this.route.snapshot.paramMap.get('id');
    if(!this.shortenID){
      this.shortenID = "";
    }
    this.changeTableSearchParameter(this.shortenID);
  }

  applyFilter(filterValue: string) {
    this.shortenID=filterValue;
    this.changeTableSearchParameter(this.shortenID);
  }

  changeTableSearchParameter(parameter: String){
    // TODO: LLamar al back-end
    console.log(parameter);
    this.tableDataByBrowser = [
      {
        agent: 'Firefox',
        views: 80
      },
      {
        agent: 'Chrome',
        views: 80
      }
    ];

    this.tableDataByOS  = [
      {
        agent: 'Windows',
        views: 80
      },
      {
        agent: 'Mac',
        views: 80
      }
    ];

    if(parameter==""){
      this.tableDataByBrowser=[];
      this.tableDataByOS=[];
    }

    this.dataSourceByBrowser.data = this.tableDataByBrowser;
    this.dataSourceByOS.data = this.tableDataByOS;
  }

}
