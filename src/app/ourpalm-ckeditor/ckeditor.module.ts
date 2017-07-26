import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {CKEditorComponent} from "./ckeditor.component";
import {ScriptLoaderService} from "./script-loader.service";

/**
 * CKEditorModule
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CKEditorComponent
    ],
    exports: [
        CKEditorComponent
    ],
    providers: [
        ScriptLoaderService
    ]
})
export class OurpalmCKEditorModule {
}