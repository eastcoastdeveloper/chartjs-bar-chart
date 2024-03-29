import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BarInterface } from './data.interface';
import * as chartData from './data.json';
import * as q2 from './q2.json';
import * as q3 from './q3.json';
import * as q4 from './q4.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class AppComponent implements OnInit {
  dataArray: BarInterface[] = [];
  data: any;
  chart: any;
  quarter: string = 'Q1';
  q1: any = chartData;
  q2: any = q2;
  q3: any = q3;
  q4: any = q4;

  ngOnInit() {
    let options: any,
      ctx: any = document.getElementById('areaChart') as HTMLElement;
    ctx.style.backgroundColor = '#FFFFFF';

    this.loadData(null, this.quarter);

    this.data = {
      labels: ['Chicago', 'London', 'Frankfurt'],
      datasets: this.dataArray,
    };

    options = {
      responsive: true,
      legend: {
        display: false,
      },
      layout: {
        padding: 5,
      },
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: options,
    });
  }

  loadData(arr: any, span: any) {
    this.dataArray = [];
    this.quarter = span;
    arr === null ? (arr = chartData) : '';
    for (let key in arr) {
      if (arr.hasOwnProperty(key)) {
        this.dataArray.push(arr[key]);
      }
      !this.dataArray[key] ? this.dataArray.pop() : '';
    }
    
    if (arr != null && this.data != undefined) {
      this.data.datasets = this.dataArray;
      console.log(this.dataArray)
      this.chart.update();
    }
  }

  // Refresh canvas dimensions
  onResize(event: any) {
    this.chart.render();
  }
}
