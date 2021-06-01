import { Component, OnInit } from '@angular/core';
import * as d3 from  'd3';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  private data =
   [
      {
        "id": 1,
        "name": "pallavi",
        "email": "pallavi@gmail.com",
        "city": "Nagpur",
        "state": "MH",
        "mobile": 7878558745,
        "age": 27,
        "dob": "2021-05-11T18:30:00.000Z",
        "postalCode": 440025
    },
    {
        "id": 2,
        "name": "rahul",
        "email": "rahul@gmail.com",
        "city": "Nagpur",
        "state": "MH",
        "mobile": 9696335698,
        "age": 14,
        "dob": "2021-05-10T18:30:00.000Z",
        "postalCode": 440025
    },
    {
      "id": 3,
      "name": "Shurti",
      "email": "shruti@gmail.com",
      "city": "Nagpur",
      "state": "MH",
      "mobile": 9958487562,
      "age": 14,
      "dob": "2021-04-06T18:30:00.000Z",
      "postalCode": 440025
      
    },
    {
      "id": 4,
      "name": "Ankush",
      "email": "ankush@gmail.com",
      "city": "Nagpur",
      "state": "MH",
      "mobile": 9958487562,
      "age": 45,
      "dob": "2021-05-17T18:30:00.000Z",
      "postalCode": 440025
  }
  ];
  private svg: any;
  private margin = 50;
  private width = 400 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2)+200)
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    let x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.name))
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    let y = d3.scaleLinear()
    .domain([0,100])
    .range([this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y));

    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: { name: string; }) => x(d.name))
    .attr("y", (d: { age: d3.NumberValue; }) => y(d.age))
    .attr("width", x.bandwidth())
    .attr("height", (d: { age: d3.NumberValue; }) => this.height - y(d.age))
    .attr("fill", "#d04a35");
  }

}
