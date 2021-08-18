import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {

  @Input('data') data: [];
  @Input('columnNames') columnNames: [];
  constructor(public themeService: ThemeService) { }

  title = 'Story Point';
  type = 'ColumnChart';
   options = {
    width: "100%",
    height: 350,
    bar: { width: "30%"},
    hAxis: {
      title: 'Sprints',
      textStyle: {
        color: this.themeService.fontColor
      },
      titleTextStyle: {
        color: this.themeService.fontColor
      }
    },
    colors: ['#10be65'], 
    is3D: true,
    backgroundColor: "none",
    titleTextStyle: {
      color: this.themeService.fontColor
    },
    vAxis: {
        textStyle: {
            color: this.themeService.fontColor
        },
        titleTextStyle: {
            color: this.themeService.fontColor
        }
    },
    chartArea: {width: '70%'},
    legend: { 
      position: 'top', 
      alignment: 'end', 
      textStyle: {
        color: this.themeService.fontColor,
      },
    }
   };
   dynamicResizable: boolean = true;

  ngOnInit(): void {
  }

}
