import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TooltipService } from '../services/tooltip.service';

@Component({
  selector: 'my-tooltip',
  templateUrl: './my-tooltip.component.html',
  styleUrls: ['./my-tooltip.component.scss'],
})
export class MyTooltipComponent implements OnInit {
  @Input() tooltipElement!: DOMRect;

  constructor(
    private tooltipService: TooltipService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const tooltip: HTMLElement | null = document.querySelector('.tooltip');
    tooltip!.style.left =
      this.tooltipElement.left + this.tooltipElement.width + 'px';
    tooltip!.style.top =
      this.tooltipElement.top + this.tooltipElement.height + 'px';
    this.renderer.appendChild(document.body, tooltip);
    this.tooltipService.currentIsMouseover$.subscribe((isMouseover) => {
      if (!isMouseover) {
        this.renderer.removeChild(document.body, tooltip);
      }
    });
  }
}
