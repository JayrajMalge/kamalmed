import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor',
  template: `
    <div class="rte-wrapper">
      <label *ngIf="label" class="rte-label">{{ label }}</label>
      <quill-editor
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        [modules]="modules"
        [placeholder]="placeholder"
        theme="snow"
      ></quill-editor>
    </div>
  `,
  styles: [`
    .rte-wrapper { margin-bottom: 16px; }
    .rte-label { display: block; font-weight: 500; font-size: 0.9rem; margin-bottom: 6px; color: #1a1a2e; }
    quill-editor { display: block; }
  `],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RichTextEditorComponent), multi: true }]
})
export class RichTextEditorComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Enter content...';

  value = '';

  modules = {
    toolbar: [
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  };

  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string): void { this.value = val || ''; }
  registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
