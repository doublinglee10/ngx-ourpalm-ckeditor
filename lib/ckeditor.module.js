import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CKEditorComponent } from "./ckeditor.component";
import { ScriptLoaderService } from "./script-loader.service";
var OurpalmCKEditorModule = (function () {
    function OurpalmCKEditorModule() {
    }
    return OurpalmCKEditorModule;
}());
export { OurpalmCKEditorModule };
OurpalmCKEditorModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
OurpalmCKEditorModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ckeditor.module.js.map