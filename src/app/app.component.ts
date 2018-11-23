import { Component } from '@angular/core';
import { DozeeService } from './dozee.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chart';
  chart = [];
  totalSleep:any;
  lightSleep:any;
  remSleep:any;
  deepTime:any;
  awake: any;
  sleepTime:any;
  weakupTime=Object;
  heartRate=Object;
  breathRate=Object;
  // hrTs=[];
  constructor(private _dozee: DozeeService) {}
  ngOnInit() {
    this._dozee.getData()
      .subscribe((res:any) => {

        console.log(res);
        this.totalSleep=(Math.round(res.durations.total/3600)+' hr '+Math.round((res.durations.total%3600)/60)+' min');
        this.lightSleep=(Math.round(res.durations.light/3600)+ ' hr '+Math.round((res.durations.light/3600)/60)+' min');
        this.remSleep=(Math.round(res.durations.rem/3600)+' hr '+Math.round((res.durations.rem%3600)/60)+' min');
        this.deepTime=(Math.round(res.durations.deep/3600)+' hr '+Math.round((res.durations.deep%3600)/60) +' min');
        this.awake=(Math.round(res.durations.awake/3600)+' hr '+Math.round((res.durations.awake%3600)/60)+' min');;
       // var x=(res.sleepTime);console.log(x);
       // this.sleepTime=(new Date(x)).toLocaleTimeString());
       // this.wakeupTime=new Date(Number(res.wakeupTime)).toLocaleTimeString('en-US'));console.log(this.wakeupTime);
       this.heartRate=res.heartRate;
       this.breathRate=res.breathRate;


       //Hypnogram Sectionr
       let stage = res['stages'].map(res => res.stage);
       let stageTs=res['stages'].map(res =>{
          let x= new Date(Number(res.ts)).toLocaleTimeString('en-US');
          return x;
       });

       this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: stageTs,
            datasets: [
              {
                data: stage,
                borderColor: "#3cba9f",
                fill: false,
                label:'Hypnogram '
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

        //heartRate..............................................start
        let hr=res.heartRates[0];
        let heartRates= hr.map(res => res.hR);
        let hrTs=hr.map(res =>{
           let x= new Date(Number(res.ts)).toLocaleTimeString('en-US');
           return x;
        });
        this.chart = new Chart('canvas1', {
           type: 'line',
           data: {
             labels:hrTs,
             datasets: [
               {
                 data: heartRates,
                 borderColor: "#3cba9f",
                 fill: false,
                 label:'heartRate'
               }
             ]
           },
           options: {
             legend: {
               display: true
             },
             scales: {
               xAxes: [{
                 display: true
               }],
               yAxes: [{
                 display: true
               }],
             }
           }
         });
         //breathRate.....................................................................start
         let br=res.breathRates[0];
         let breathRates= hr.map(res => res.hR);
         let brTs=hr.map(res =>{
            let x= new Date(Number(res.ts)).toLocaleTimeString('en-US');
            return x;
         });
         this.chart = new Chart('canvas2', {
            type: 'line',
            data: {
              labels:brTs,
              datasets: [
                {
                  data: breathRates,
                  borderColor: "#3cba9f",
                  fill: false,
                  label:'breathRate'
                }
              ]
            },
            options: {
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          });
          //movement...........................................................................end
          let mvF=res['events'].filter(res => res.MV);
          let mv=mvF.map(res=>res.MV.duration);
          let mvTs=mvF.map(res =>{
             let x= new Date(Number(res.ts)).toLocaleTimeString('en-US');
             return x;});
          this.chart = new Chart('canvas3', {
             type: 'line',
             data: {
               labels:mvTs,
               datasets: [
                 {
                   data: mv,
                   borderColor: "#3cba9f",
                   fill: false,
                   label:'movement'
                 }
               ]
             },
             options: {
               legend: {
                 display: true
               },
               scales: {
                 xAxes: [{
                   display: true
                 }],
                 yAxes: [{
                   display: true
                 }],
               }
             }
           });
           //Snoring..................................................
           let snF=res['events'].filter(res => res.SN);
           let sn=snF.map(res=>res.SN.duration);
           let snTs=snF.map(res =>{
              let x= new Date(Number(res.ts)).toLocaleTimeString('en-US');
              return x;});
           this.chart = new Chart('canvas4', {
              type: 'line',
              data: {
                labels:snTs,
                datasets: [
                  {
                    data: sn,
                    borderColor: "#3cba9f",
                    fill: false,
                    label:'Snoring'
                  }
                ]
              },
              options: {
                legend: {
                  display: true
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }],
                }
              }
            });
            //Hypopnea duration...........................................................
            let hd=res['conditions'].map(res => res.hd);

            let hdTs=res['conditions'].map(res =>{
               let x= new Date(Number(res.ts)).toLocaleTimeString('en-US');
               return x;});
            this.chart = new Chart('canvas5', {
               type: 'line',
               data: {
                 labels:hdTs,
                 datasets: [
                   {
                     data: hd,
                     borderColor: "#3cba9f",
                     fill: false,
                     label:'Hypopnea duration'
                   }
                 ]
               },
               options: {
                 legend: {
                   display: true
                 },
                 scales: {
                   xAxes: [{
                     display: true
                   }],
                   yAxes: [{
                     display: true
                   }],
                 }
               }
             });
             //Pie Graph
             let total=res.durations.deep+res.durations.rem+res.durations.light+res.durations.awake;
             let data=[Math.round((res.durations.deep/total)*100),Math.round((res.durations.rem/total)*100),Math.round((res.durations.light/total)*100),Math.round((res.durations.awake/total)*100)];
             //console.log(data);
             this.chart= new Chart('canvas6',{
             type: 'doughnut',
             data: {
               labels : ['deep','rem','light','awake'],
               datasets:[

                 {data: data,
                   backgroundColor:['#778899','#FFE4E1','	#008080','red'],
                   pointBackgroundColor	:['Green','red','Blue','red'],
                   label	:['Green','red','Blue','red']
                 }
                 //{pointBackgroundColor	:['green','red']}
               ]},
             options: {
               legend: {
                 display: true
               }
             }
              });


      })
  }
}
