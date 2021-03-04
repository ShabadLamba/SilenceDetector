import {
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { extent } from 'd3';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';

@Component({
  selector: 'app-engery-graph',
  templateUrl: './engery-graph.component.html',
  styleUrls: ['./engery-graph.component.scss'],
})
export class EngeryGraphComponent implements OnInit, OnChanges {
  public title = 'Frames vs Log Energy';

  @Input() public data: { x_value: number; y_value: number }[];
  @Output() public audioGraphChanged = new EventEmitter<String>();

  private width = 720;
  private height = 340;
  private margin = 30;

  public svg;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;
  public zoom;
  private line: d3Shape.Line<[number, number]>;

  constructor(public chartElem: ElementRef) {}

  public ngOnInit(): void {
    // this.buildSvg();
    // this.addXandYAxis();
    // this.drawLineAndPath();
    // this.zoomASection();
    d3.selectAll('svg').remove();
  }

  public ngOnChanges(changes): void {
    if (changes.hasOwnProperty('data') && this.data) {
      d3.selectAll('svg').remove();
      console.log(this.data);
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    }
  }

  changeAudioGraph(val) {
    this.audioGraphChanged.emit(val);
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .select('.linechart')
      .append('svg')
      .attr('height', this.height);
    this.svgInner = this.svg
      .append('g')
      .style(
        'transform',
        'translate(' + this.margin + 'px, ' + this.margin + 'px)'
      );

    this.yScale = d3
      .scaleLinear()
      .domain([
        d3.max(this.data, (d) => d.y_value) + 1,
        d3.min(this.data, (d) => d.y_value) - 1,
      ])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.xScale = d3
      .scaleLinear()
      .domain([
        d3.min(this.data, (d) => d.x_value) - 1,
        d3.max(this.data, (d) => d.x_value) + 1,
      ])
      .range([0, this.width - 2 * this.margin]);
    // .domain(d3.extent(this.data, (d) => d.x_value));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style(
        'transform',
        'translate(0, ' + (this.height - 2 * this.margin) + 'px)'
      );

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .attr('stroke', 'steelblue')
      .style('stroke-width', 1.5);
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);
    // .call(d3.zoom().on('zoom', this.zoomed.bind(this))) //<-- arrow syntax
    // .append('svg:g');

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3.axisBottom(this.xScale).ticks(this.data.length / 10);

    this.xAxis.call(xAxis);

    const yAxis = d3.axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1]);

    const points: [number, number][] = this.data.map((d) => [
      this.xScale(d.x_value),
      this.yScale(d.y_value),
    ]);

    this.lineGroup.attr('d', line(points));
  }
}
