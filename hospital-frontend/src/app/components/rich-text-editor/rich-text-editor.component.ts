import { Component, ElementRef, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  onChange: any = () => {};
  onTouched: any = () => {};
  isDisabled = false;

  isBold = false;
  isItalic = false;

  private pendingValue = '';

  ngAfterViewInit() {
    if (this.pendingValue !== undefined) {
      this.editor.nativeElement.innerHTML = this.pendingValue;
    }
    setTimeout(() => this.checkActiveFormats(), 0);
  }

  writeValue(value: any): void {
    const val = value || '';
    if (this.editor) {
      this.editor.nativeElement.innerHTML = val;
    } else {
      this.pendingValue = val;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.editor) {
      this.editor.nativeElement.contentEditable = isDisabled ? 'false' : 'true';
    }
  }

  format(command: 'bold' | 'italic') {
    if (this.isDisabled) return;
    document.execCommand(command, false, undefined);
    this.editor.nativeElement.focus();
    this.checkActiveFormats();
    this.onInput();
  }

  onInput() {
    if (this.isDisabled) return;
    const html = this.editor.nativeElement.innerHTML;
    // Notify forms framework of value changes
    this.onChange(html);
  }

  onBlur() {
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      const key = event.key.toLowerCase();
      if (key === 'b') {
        event.preventDefault();
        this.format('bold');
      } else if (key === 'i') {
        event.preventDefault();
        this.format('italic');
      } else if (key === 'u') {
        // Prevent underline
        event.preventDefault();
      }
    }
  }

  checkActiveFormats() {
    try {
      this.isBold = document.queryCommandState('bold');
      this.isItalic = document.queryCommandState('italic');
    } catch (e) {
      // Command checking might fail depending on context/browser focus
    }
  }
}
