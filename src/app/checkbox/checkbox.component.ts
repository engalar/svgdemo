import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  get indeterminate(): boolean {
    return this._indeterminate;
  }

  set indeterminate(value: boolean) {
    this._indeterminate = value;
  }

  checked = false;
  private _indeterminate = false;
  align = 'start';
  disabled = false;


  ngOnInit() {
  }

  constructor(public snackBar: MdSnackBar) {
  }

  openSnackBar() {
    this.snackBar.open('🍕🍕🍕🍕🍕 Pizza party!!! 🍕🍕🍕🍕🍕', null, {
      duration: 500,
    });
  }
}
