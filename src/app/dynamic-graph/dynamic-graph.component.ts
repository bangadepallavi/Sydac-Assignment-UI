import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';



@Component({
  selector: 'app-dynamic-graph',
  templateUrl: './dynamic-graph.component.html',
  styleUrls: ['./dynamic-graph.component.css']
})
export class DynamicGraphComponent implements OnInit{
  x: any 
  y: any 
  private data:number[][] = [
    [2, 69],
    [ 87,73],
    [ 43,  11],
    [ 44, 5],
    [ 15, 22],
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  public lineGroup: any;
  lineArea: any;
  id: any;
  svgg:any;
  constructor() { }

ngOnInit(): void
 {     
    this.createSvg();
    this.id = setInterval(() => {
     let a=Math.floor(Math.random() * (100 - 1) + 1);
     let b=Math.floor(Math.random() * (100 - 1) + 1);
      this.data.push( [a, b])
    this.drawPlot();
    }, 3000);
    setInterval( () => {
      this.data=[]     
      this.clearPlot()
     }, 10000);
  }
  private createSvg(): void {
    this.svg = d3.select("#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

     this.x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x));

     this.y = d3.scaleLinear()
    .domain([0, 100])
    .range([ this.height, 0]);
    this.svgg=this.svg.append("g")
    .call(d3.axisLeft(this.y));
  }
  
  private drawPlot(): void
  {
    let dots = this.svg.append('g')
    .attr('class','dot');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: d3.NumberValue[])=> this.x(d[0]))
    .attr("cy", (d: d3.NumberValue[]) => this.y(d[1]))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    this.svg.append("path")
    .attr('class','linePath')
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x((d)=>{ return this.x(d[0])})
        .y((d)=>{ return this.y(d[1])}))            
  }
  clearPlot(){
    this.svgg.selectAll('.dot').remove();
    d3.selectAll('.linePath').remove();
    d3.selectAll('.dot').remove();
  }
}
