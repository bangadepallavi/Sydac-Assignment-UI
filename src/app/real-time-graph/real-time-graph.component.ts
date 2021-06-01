import { Component, ElementRef, OnInit, ViewChild , OnChanges,  Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-real-time-graph',
  templateUrl: './real-time-graph.component.html',
  styleUrls: ['./real-time-graph.component.css']
})
export class RealTimeGraphComponent implements OnInit{
  @ViewChild('chart')
  private chartContainer!: ElementRef;
  private data:any[][] = [
    ['2', 69],
    [ '87',73],
    [ '43',  11],
    [ '44', 5],
    [ '15', 22],
  ];
  private width=1000;
  private height=800
  private margin={top:50,bottom:50,left:50,right:50}
  private svg:any;
  x:any;
  y:any;
  svgg: any;

  ngOnInit(): void {
    this.createSvg();
    setInterval( () => {
       this.data=[]     
       this.clearbar()
       this.generateData();
       this.drawBars(this.data);
    }, 3000);
  }
  constructor(){}
  generateData(){
    for (let i=0;i<9;i++){
      let a=Math.floor(Math.random() * (100 - 1) + 1);
      let b=Math.floor(Math.random() * (100 - 1) + 1);
       this.data.push( [""+a, b])
    }
  }

  createSvg()
  {
    this.svg=d3.select("#d3Container")
    .append('svg')
    .attr('height',this.height)
    .attr('width',this.width)
    .append('g')
    .attr("transform", "translate(" + this.margin.top + "," + this.margin.bottom + ")");
    
  }

  private drawBars(data: any[]): void {
    this.x = d3.scaleBand()
    .range([0, this.width])
    .domain(this.data.map(d => d[0]))
    .padding(0.5);

    this.y=d3.scaleLinear()
    .domain([0,100])
    .range([ this.height-this.margin.top-this.margin.bottom, 0]);

    this.svg.append("g")
    .attr('class','plot-bar')
    .call(d3.axisBottom(this.x))
    .attr('transform', 'translate(0,' + (this.y(0)) + ')')

    this.svgg=this.svg.append("g")
    .call(d3.axisLeft(this.y))

    
    this.svg.selectAll("rect")
    .data(this.data)
    .enter()
    .append("rect")
    .attr('class','barsGraph')
    .attr('fill','#990000')
    .attr('x',(d:any)=>this.x(d[0]))  
    .attr("y", (d: any) => this.y(d[1]))
    .attr("height", (d:any) => this.y(0) - this.y(d[1]))
    .attr("width", 50);

    let t = d3.transition()
    .duration(2000);
    d3.selectAll(".barsGraph")
   .transition()
   .duration(2000)
   .style("fill", "#ff9999");
  }
  clearbar(){
    d3.selectAll('.plot-bar').remove();
    d3.selectAll('.barsGraph').remove();
  }
}


