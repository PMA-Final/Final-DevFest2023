import { Component, OnInit, Renderer2 } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { ChartService } from '../service/chart.service';
import { Markets } from '../model/market';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartData: any;

  product_nameData: any[] = [];
  average_revenueData: any[] = [];
  colorData: any[] = [];

  marketList: Markets[] = []

  constructor(
    private chartService: ChartService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/index.js';
    this.renderer.appendChild(document.body, script);

    this.chartService.GetAll().subscribe(data => {
      this.chartData = data
      if (this.chartData != null) {
        for (let i = 0; i < this.chartData.length; i++) {
          this.product_nameData.push(this.chartData[i].product_name);
          this.average_revenueData.push(this.chartData[i].average_revenue);
          const randomColor = this.getRandomColor();
          this.colorData.push(randomColor);
        }
        this.RenderChart2(this.product_nameData, this.average_revenueData, this.colorData, 'bar', 'barchart')
        this.RenderChart2(this.product_nameData, this.average_revenueData, this.colorData, 'doughnut', 'dougnhnutchart')
        this.RenderChart2(this.product_nameData, this.average_revenueData, this.colorData, 'polarArea', 'polarAreaChart')
      }
    })

    this.chartService.GetAll().subscribe(data =>{
      this.marketList = data
    })

    this.RenderChart()
    this.RenderChartToTal()
  }

  getRandomColor(): string {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
  }
  

  

  RenderChart() {
    const myChart = new Chart("Linechart", {
      type: 'line',
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [
          {
            label: 'hương thơm',
            data: [12000, 15000, 18000, 20000, 25000],  // Updated data
            borderColor: 'red',
            borderWidth: 1,
          },
          {
            label: 'mực toner',
            data: [10000, 18000, 22000, 19000, 24000],  // Updated data
            borderColor: 'blue',
            borderWidth: 1
          },
          {
            label: 'Kem dưỡng da',
            data: [15000, 20000, 16000, 12000, 18000],  // Updated data
            borderColor: 'green',
            borderWidth: 1
          },
          {
            label: 'lót',
            data: [18000, 15000, 12000, 22000, 14000],  // Updated data
            borderColor: 'yellow',
            borderWidth: 1
          },
          {
            label: 'Kem dưỡng ẩm',
            data: [12000, 15000, 12000, 19000, 18000],  // Updated data
            borderColor: 'purple',
            borderWidth: 1
          },
          {
            label: 'Sữa rửa mặt',
            data: [15000, 12000, 18000, 19000, 22000],  // Updated data
            borderColor: 'pink',
            borderWidth: 1
          },
          {
            label: 'Kem mờ vết sạm',
            data: [18000, 15000, 16000, 22000, 20000],  // Updated data
            borderColor: 'black',
            borderWidth: 1
          },
          {
            label: 'người che khuyết điểm',
            data: [20000, 15000, 18000, 21000, 22000],  // Updated data
            borderColor: 'brown',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  RenderChartToTal() {
    const myChart = new Chart("LinechartTotal", {
      type: 'line',
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [{
          label: 'Tổng các Mặt Hàng',
          data: [27000, 35000, 37000, 42000, 39000],
          borderColor: 'red',
          borderWidth: 1,
          fill: true,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  RenderChart2(labelData: any, realData: any, colorData: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [{
          data: realData,
          backgroundColor: colorData,
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
