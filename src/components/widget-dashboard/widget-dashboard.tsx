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

  render() {
    return (
      <div class="chartContainer">
        <canvas class="myChart"></canvas>
      </div>
    );
  }
}

