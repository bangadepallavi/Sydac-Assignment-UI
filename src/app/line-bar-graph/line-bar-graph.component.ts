import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-bar-graph',
  templateUrl: './line-bar-graph.component.html',
  styleUrls: ['./line-bar-graph.component.css']
})
export class LineBarGraphComponent implements OnInit {
  selectedGraph: any;
  x: any 
  y: any 
  private dataForLine:number[][] = [[2, 69],[ 87,73],[ 43,  11],[ 44, 5],[ 15, 22],];
  private dataForBar:any[][] = [['2', 69],[ '87',73],[ '43',  11],[ '44', 5],[ '15', 22]];
  private svg: any;
  private margin = 50;
  private svg1: any;
   marked1 = false;
   marked2 = false;

  private width=500;
  private height=300;
  private barMargin={top:50,bottom:50,left:50,right:50}

  public lineGroup: any;
  lineArea: any;
  timeForLine: any;
  timeForBar:any;
  timeForGenerateNumber:any;
  constructor() { }

  ngOnInit(): void {
    this.createSvg()
    this.createSvg1()

  }

  createSvg()
  {
    d3.selectAll('.line').remove()
    this.svg=d3.select("#barContainer") 
    .append('svg')
    .attr('class','bar')
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append('g')
    .attr("transform", "translate(" + this.barMargin.top + "," + this.barMargin.bottom + ")");
  }
  createSvg1()
  {
    d3.selectAll('.line').remove()
    this.svg1=d3.select("#lineContainer") 
    .append('svg')
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append('g')
    .attr("transform", "translate(" + this.barMargin.top + "," + this.barMargin.bottom + ")");
  }

  // For Line chart
  private createAxisForLineChart(): void {
     this.x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, this.width ]);
    
    this.svg1.append("g")
    .attr('class','xaxisLine')
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x));

     this.y = d3.scaleLinear()
    .domain([0, 100])
    .range([ this.height, 0]);

    
    this.svg1.append("g")
    .attr('class','yaxisLine')
    .call(d3.axisLeft(this.y));
  }
  
  private drawPlotForLineChart(): void
  {
    this.removeLineAxis();
    this.createAxisForLineChart();

    let dots = this.svg1.append('g')
    .attr('class','dot');

    dots.selectAll("dot")
    .data(this.dataForLine)
    .enter()
    .append("circle")
    .attr("cx", (d: d3.NumberValue[])=> this.x(d[0]))
    .attr("cy", (d: d3.NumberValue[]) => this.y(d[1]))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    this.svg1.append("path")
    .attr('class','linePath')
      .datum(this.dataForLine)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x((d)=>{ return this.x(d[0])})
        .y((d)=>{ return this.y(d[1])}))            
  }
  clearPlotForLineChart(){
    d3.selectAll('.linePath').remove();
    d3.selectAll('.dot').remove();
  }

  //For Bar chart
  generateData(){
    for (let i=0;i<9;i++){
      let a=Math.floor(Math.random() * (100 - 1) + 1);
      let b=Math.floor(Math.random() * (100 - 1) + 1);
      this.dataForLine.push([a,b]);
       this.dataForBar.push( [""+a, b])
    }
  }
  
  private drawForBarGraph(data: any[]): void {
    this.x=d3.scaleBand()
    .range([0, this.width])
    .domain(this.dataForBar.map(d => d[0]))
    .padding(0.5);
    
    this.y=d3.scaleLinear()
    .domain([0,100])
    .range([ this.height, 0]);
    
    this.svg.append("g")
    .attr('class','xaxisBar')
    .call(d3.axisBottom(this.x))
    .attr('transform', 'translate(0,' + (this.y(0)) + ')')

    this.svg.append("g")
    .attr('class','yaxisBar')
    .call(d3.axisLeft(this.y))

    
    this.svg.selectAll("rect")
    .data(this.dataForBar)
    .enter()
    .append("rect")
    .attr('class','barsGraph')
    .attr('fill','#990000')
    .attr('x',(d:any)=>this.x(d[0]))  
    .attr("y", (d: any) => this.y(d[1]))
    .attr("height", (d:any) => this.y(0) - this.y(d[1]))
    .attr("width", 50);

    d3.selectAll(".barsGraph")
   .transition()
   .duration(2000)
   .style("fill", "#ff6633");
  }
  clearbarForBarGraph(){
    d3.selectAll('.yaxisBar').remove();
    d3.selectAll('.xaxisBar').remove();
    d3.selectAll('.barsGraph').remove();
  }

  removeBarAxis(){
    d3.select('.xaxisBar').remove();
    d3.select('.yaxisBar').remove();
  }

  removeLineAxis(){
    d3.selectAll('.xaxisLine').remove();
    d3.selectAll('.yaxisLine').remove();
  }

  toggleVisibility1(e:any){
    this.marked1= e.target.checked;
    if(e.target.checked)
    {
      this.timeForBar=setInterval( () => {
       this.dataForBar=[]
       this.clearbarForBarGraph()     
       this.generateData();
       this.drawForBarGraph(this.dataForBar);
      }, 5000);
    }
    else{
      clearInterval(this.timeForBar)
      this.clearbarForBarGraph();
      this.removeBarAxis();
    }
  }
  
  toggleVisibility2(e:any){
    this.marked2= e.target.checked;
    console.log(this.marked2)
    if(e.target.checked)
    {
      this.createAxisForLineChart();
      this.timeForLine=setInterval( () => {
        this.dataForLine=[]     
        this.clearPlotForLineChart()
        this.generateData();
      this.drawPlotForLineChart();
       }, 5000);
    }
    else{
      clearInterval(this.timeForLine)
      this.clearPlotForLineChart();
      this.removeLineAxis();
    }
  }
}
