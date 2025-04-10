export enum ElementType {
  InputField = 'Input Field',
  Button = 'Button',
  Checkbox = 'Checkbox',
  Select = 'Select'
}

import { InputFieldComponent } from './input-field/input-field.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';

export const elementComponentMap = {
  [ElementType.InputField]: InputFieldComponent,
  [ElementType.Button]: ButtonComponent,
  [ElementType.Checkbox]: CheckboxComponent,
  [ElementType.Select]: SelectComponent
};
