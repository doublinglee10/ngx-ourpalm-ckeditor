# NgxOurpalmCkeditor

Angular 2+ Port for the ckeditor [http://ckeditor.com](http://ckeditor.com)

## Installation

```javascript
npm install ngx-ourpalm-ckeditor --save
```

## Demo1

* Step1: Include CKEditor javascript files in your application

```javascript
 <script src="https://cdn.ckeditor.com/4.5.11/full/ckeditor.js"></script>
```

* Step2: Include CKEditorModule in your main module

```javascript
import { OurpalmCKEditorModule } from 'ngx-ourpalm-ckeditor';

@NgModule({
  // ...
  imports:      [
    OurpalmCKEditorModule
  ],
  // ...
})
export class AppModule { }
```

* Step3: Use it in your component

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  template: `
  <ourpalm-ckeditor
    [(ngModel)]="ckeditorContent"
    [config]="{uiColor: '#99000'}"
    [readonly]="false"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    debounce="500">
  </ourpalm-ckeditor>
  `
})
export class Sample{
  constructor(){
    this.ckeditorContent = `<p>My HTML</p>`;
  }
}
```

## Demo2 (async load ckeditor.js)

* Step1: Include CKEditorModule in your main module

```javascript
import { OurpalmCKEditorModule } from 'ngx-ourpalm-ckeditor';

@NgModule({
  // ...
  imports:      [
    OurpalmCKEditorModule
  ],
  // ...
})
export class AppModule { }
```

* Step2: Use it in your component

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  template: `
  <ourpalm-ckeditor
    [ckeditorJsPath]="'assets/ckeditor/ckeditor.js'"
    [ckeditorBasePath]="'assets/ckeditor/'"
    [(ngModel)]="ckeditorContent"
    [config]="{uiColor: '#99000'}"
    [readonly]="false"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    debounce="500">
  </ourpalm-ckeditor>
  `
})
export class Sample{
  constructor(){
    this.ckeditorContent = `<p>My HTML</p>`;
  }
}
```

In this way, ckeditor.js will load async by dynamic. So the bundle file would not include ckeditor.js

In order to async load the ckeditor.js, I have to modify the ng2-ckeditor. Modify from the project [ng2-ckeditor](https://github.com/chymz/ng2-ckeditor) , thank a lot.