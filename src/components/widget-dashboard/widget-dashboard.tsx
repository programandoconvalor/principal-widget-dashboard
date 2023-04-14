import {Component, h, Event, EventEmitter, Element,Prop,Listen} from '@stencil/core';
import { Chart, registerables } from 'chart.js';

@Component({
  tag: 'principal-widget-dashboard',
  styleUrl: 'widget-dashboard.css',
  shadow: true,
})
export class WidgetDashboard {
  @Event() private changedDataset: EventEmitter<any>;
  @Element() private element: HTMLElement;
  @Prop() labels: string[];
  @Prop() title : string;
  @Prop() colors: string[];
  @Prop() values: string[];

  myChartRef: any;
  myChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  componentDidLoad() {
    this.myChartRef = this.element.shadowRoot.querySelectorAll('canvas.myChart');
    setTimeout(() => {
      this.changedDataset.emit({
        type: "pie",
        data: {
          labels: this.labels,
          datasets: [{
            backgroundColor: this.colors,
            data:this.values,
          }]
        },
        options: {
          title: {
            display: true,
            text: this.title
          }
        }
      })
    }, 100);
  }

  @Listen('changedDataset', { target: 'window' })
  changedDatasetEventHandler(event: any) {
    if(this.myChart !== undefined) {
      this.myChart.destroy();
    }

    this.myChart = new Chart(
      this.myChartRef,
      event.detail
    );
  }

  /*labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];*/
 ;
  /*config: any = {
    type: 'line',
    data: this.data,
    options: {}
  };*/

  private changedDatasetEvent = (event: any) => {
    console.log('esto=',event)
    /*if(event.path[0].selectedIndex === 0) {
      this.data.datasets[0].data = [0, 10, 5, 2, 20, 30, 45];
      this.data.datasets[0].label = "My First Dataset";
    } else if (event.path[0].selectedIndex === 1) {
      this.data.datasets[0].data = [30, 20, 40, 45, 20, 3, 10];
      this.data.datasets[0].label = "My Second Dataset";
    } else {
      this.data.datasets[0].data = [10, 10, 15, 12, 120, 130, 145];
      this.data.datasets[0].label = "My Third Dataset";
    }*/
    //this.changedDataset.emit(this.config); // now correct this
  }

  render() {
    return (
      <div class="chartContainer">
        <canvas class="myChart"></canvas>
      </div>
    );
  }
}

