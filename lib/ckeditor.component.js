import { Component, EventEmitter, forwardRef, Input, NgZone, Output, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ScriptLoaderService } from "./script-loader.service";
var CKEditorComponent = (function () {
    function CKEditorComponent(zone, loader) {
        this.loader = loader;
        this.change = new EventEmitter();
        this.ready = new EventEmitter();
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this._value = '';
        this.zone = zone;
    }
    Object.defineProperty(CKEditorComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    CKEditorComponent.prototype.ngOnChanges = function (changes) {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    };
    CKEditorComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.instance) {
            setTimeout(function () {
                _this.instance.removeAllListeners();
                CKEDITOR.instances[_this.instance.name].destroy();
                _this.instance.destroy();
                _this.instance = null;
            });
        }
    };
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        this.ckeditorPreInit(this.config || {});
    };
    CKEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this.value = value;
            _this.onChange(value);
            _this.onTouched();
            _this.change.emit(value);
        });
    };
    CKEditorComponent.prototype.ckeditorPreInit = function (config) {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            if (this.ckeditorJsPath) {
                if (this.ckeditorBasePath) {
                    window.CKEDITOR_BASEPATH = this.ckeditorBasePath;
                }
                this.loader.load({
                    src: this.ckeditorJsPath
                }).subscribe(function () {
                    _this.ckeditorInit(config);
                });
            }
            else {
                console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
            }
        }
        else {
            this.ckeditorInit(config);
        }
    };
    CKEditorComponent.prototype.ckeditorInit = function (config) {
        var _this = this;
        if (this.readonly) {
            config.readOnly = this.readonly;
        }
        this.instance = CKEDITOR.replace(this.host.nativeElement, config);
        this.instance.setData(this.value);
        this.instance.on('instanceReady', function (evt) {
            _this.ready.emit(evt);
        });
        this.instance.on('change', function () {
            _this.onTouched();
            var value = _this.instance.getData();
            if (_this.debounce) {
                if (_this.debounceTimeout)
                    clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = setTimeout(function () {
                    _this.updateValue(value);
                    _this.debounceTimeout = null;
                }, parseInt(_this.debounce));
            }
            else {
                _this.updateValue(value);
            }
        });
        this.instance.on('blur', function (evt) {
            _this.blur.emit(evt);
        });
        this.instance.on('focus', function (evt) {
            _this.focus.emit(evt);
        });
    };
    CKEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
        if (this.instance)
            this.instance.setData(value);
    };
    CKEditorComponent.prototype.onChange = function (_) {
    };
    CKEditorComponent.prototype.onTouched = function () {
    };
    CKEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CKEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return CKEditorComponent;
}());
export { CKEditorComponent };
CKEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ourpalm-ckeditor',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return CKEditorComponent; }),
                        multi: true
                    }
                ],
                template: "<textarea #host></textarea>",
            },] },
];
CKEditorComponent.ctorParameters = function () { return [
    { type: NgZone, },
    { type: ScriptLoaderService, },
]; };
CKEditorComponent.propDecorators = {
    'config': [{ type: Input },],
    'readonly': [{ type: Input },],
    'debounce': [{ type: Input },],
    'ckeditorJsPath': [{ type: Input },],
    'ckeditorBasePath': [{ type: Input },],
    'change': [{ type: Output },],
    'ready': [{ type: Output },],
    'blur': [{ type: Output },],
    'focus': [{ type: Output },],
    'host': [{ type: ViewChild, args: ['host',] },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=ckeditor.component.js.map