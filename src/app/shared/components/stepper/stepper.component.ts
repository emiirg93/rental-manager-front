import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-stepper',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit {
  @Input() currentStepIndex = 2;
  @Input() steps: string[] = ['Boletas ABL y Expensas', 'Comprobante de pago y envio de email', 'Finalización'];
  @Input() lastStepCompleted = true;

  ngOnInit(): void {
      if (this.currentStepIndex < 0) {
          this.currentStepIndex = 0;
      } else if (this.currentStepIndex >= this.steps.length) {
          this.currentStepIndex = this.steps.length - 1;
      }
  }

  isStepCompleted(index: number): boolean {
      return this.currentStepIndex > index || (index === this.steps.length - 1 && this.lastStepCompleted);
  }
}

