import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

interface TableRow {
  agent: String;
  clicks: Number;
}

interface TableHeader {
  agent: String;
  clicks: String;
}

@Component({
  selector: 'app-statics-global',
  templateUrl: './statics-global.component.html',
  styleUrls: ['./statics-global.component.css']
})
export class StaticsGlobalComponent implements OnInit {
  stompClient = null;

  shortenID: String = '';

  columnsIDs: Array<String> = ['agent', 'clicks'];
  // ID of different columns of the table, this make a relation between columnNames and displayedData

  /**
   * Table by browser config
   */
  dataSourceByBrowser = new MatTableDataSource<Object>();
  columnsNamesByBrowser: TableHeader = { agent: 'Navegador', clicks: 'Visitas' }; // Name of different columns of the table
  tableDataByBrowser: Array<TableRow>; // Data to display on the table

  /**
   * Table by os config
   */
  dataSourceByOS = new MatTableDataSource<Object>();
  columnsNamesByOS: TableHeader = { agent: 'Sistema operativo', clicks: 'Visitas' }; // Name of different columns of the table
  tableDataByOS: Array<TableRow>; // Data to display on the table

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.shortenID = this.route.snapshot.paramMap.get('id');
    if (!this.shortenID) {
      this.shortenID = '';
    }
    this.changeTableSearchParameter(this.shortenID);
  }

  applyFilter(filterValue: string) {
    this.shortenID = filterValue;
    this.changeTableSearchParameter(this.shortenID);
  }

  changeTableSearchParameter(parameter: String) {
    this.tableDataByBrowser = [];
    this.tableDataByOS = [];

    if (parameter === '') {
      this.tableDataByBrowser = [];
      this.tableDataByOS = [];
    }

    this.disconnect();
    this.connect(parameter);
  }


  private connect(sequence: String) {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    var self = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      self.stompClient.subscribe('/user/stats/global', function (greeting) {
        if(JSON.parse(greeting.body).parameter==="os"){
          self.tableDataByOS = JSON.parse(greeting.body).stats;
          self.dataSourceByOS.data = self.tableDataByOS;
        }else{
          self.tableDataByBrowser = JSON.parse(greeting.body).stats;
          self.dataSourceByBrowser.data = self.tableDataByBrowser;
        }
      });

      self.stompClient.subscribe('/topic/stats/global/os/' + sequence, function (greeting) {
        let actual = JSON.parse(greeting.body).stats;
        actual.array.forEach(element => {
          let contenido = false;
          for(let i = 0; i < self.tableDataByOS.length; i++){
            if(self.tableDataByOS[i].agent === element.agent){
              self.tableDataByOS[i]=element;
              contenido = true;
            }
          }
          if(!contenido){
            self.tableDataByOS.push(element);
          }
        });
      });

      self.stompClient.subscribe('/topic/stats/global/browser/' + sequence, function (greeting) {
        let actual = JSON.parse(greeting.body).stats;
        actual.array.forEach(element => {
          let contenido = false;
          for(let i = 0; i < self.tableDataByBrowser.length; i++){
            if(self.tableDataByBrowser[i].agent === element.agent){
              self.tableDataByBrowser[i]=element;
              contenido = true;
            }
          }
          if(!contenido){
            self.tableDataByOS.push(element);
          }
        });
      });

      self.stompClient.send('/app/stats/global/os', {}, sequence);
      self.stompClient.send('/app/stats/global/browser', {}, sequence);

    });
  }

  private disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

}
