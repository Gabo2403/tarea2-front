import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct, ICategory } from '../../../interfaces';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProductFormComponent {
  public fb: FormBuilder = inject(FormBuilder);

  @Input() form!: FormGroup;
  @Input() categories: ICategory[] = [];
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave() {
    const product: IProduct = {
      nombre: this.form.controls['name'].value,
      descripcion: this.form.controls['description'].value,
      precio: this.form.controls['price'].value,
      cantidadEnStock: this.form.controls['stockQuantity'].value,
      categoria: {
        id: this.form.controls['categoryId'].value
      }
    };

    if (this.form.controls['id'].value) {
      product.id = this.form.controls['id'].value;
      this.callUpdateMethod.emit(product);
    } else {
      this.callSaveMethod.emit(product);
    }
  }
}