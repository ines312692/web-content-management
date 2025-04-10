import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { takeUntil, tap, distinctUntilChanged, filter } from "rxjs/operators";

import { AsyncPipe, NgIf } from '@angular/common';
import {ILayout} from '../../models/ILayout';

@Component({
  selector: 'app-layout-details',
  templateUrl: './layout-details.component.html',
  styleUrls: ['./layout-details.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDetailsComponent implements OnInit, OnDestroy {
  @Input() layout$: Observable<ILayout> | undefined;
  @Output() save = new EventEmitter<ILayout>();

  destroy$ = new Subject<void>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    description: new FormControl(''),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    width: new FormControl(''),
    height: new FormControl(''),
    backgroundColor: new FormControl('#ffffff'),  // Valeur par défaut blanche
    borderColor: new FormControl('#000000')  // Valeur par défaut noire
  });

  ngOnInit(): void {
    if (!this.layout$) {
      console.warn('layout$ is undefined');
      return;
    }

    this.layout$.pipe(
      takeUntil(this.destroy$),
      filter(layout => !!layout),
      distinctUntilChanged(),
      tap(layout => {
        console.log('Détail du layout reçu :', layout);
        this.form.patchValue({
          name: layout.name,
          code: layout.code,
          description: layout.description ?? '',
          type: layout.type,
          status: layout.status,
          width: layout.width ?? '',
          height: layout.height ?? '',
          backgroundColor: layout.backgroundColor ?? '#ffffff',
          borderColor: layout.borderColor ?? '#000000'
        });
      })
    ).subscribe();
  }


  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value as ILayout);
    } else {
      console.warn('Le formulaire contient des erreurs.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
