import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RichTextEditorComponent } from './components/rich-text-editor/rich-text-editor.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, RichTextEditorComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, QuillModule],
  exports: [NavbarComponent, FooterComponent, RichTextEditorComponent, CommonModule, ReactiveFormsModule, FormsModule]
})
export class SharedModule {}
