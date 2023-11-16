import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class CommonService {
  constructor(private http: HttpClient) { }
 
  MarkAllAllCtrlDirty(frm: FormGroup) {
    Object.values(frm.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
    });

  }

  SetFormValue(frm: FormGroup, name: string, value: any) {
    frm.controls[name].setValue(value);
  }
  GetFormValue(frm: FormGroup, name: string) {
    return frm.controls[name].value;
  }

  GetQueryStringValue(key: string | number | boolean) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
	
}