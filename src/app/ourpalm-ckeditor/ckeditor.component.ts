// Imports
import {
    AfterViewInit,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ScriptLoaderService} from "./script-loader.service";

declare let CKEDITOR: any;

/**
 * CKEditor component
 * Usage :
 *  <ourpalm-ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ourpalm-ckeditor>
 */
@Component({
    selector: 'ourpalm-ckeditor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CKEditorComponent),
            multi: true
        }
    ],
    template: `<textarea #host></textarea>`,
})
export class CKEditorComponent implements OnChanges, AfterViewInit, OnDestroy {

    @Input() config: any;
    @Input() readonly: boolean;
    @Input() debounce: string;
    @Input() ckeditorJsPath: string;
    @Input() ckeditorBasePath: string;

    @Output() change = new EventEmitter();
    @Output() ready = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() focus = new EventEmitter();
    @ViewChild('host') host: any;

    _value = '';
    instance: any;
    debounceTimeout: any;
    zone: NgZone;

    /**
     * Constructor
     */
    constructor(zone: NgZone, private loader: ScriptLoaderService) {
        this.zone = zone;

    }

    get value(): any {
        return this._value;
    }

    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    }

    /**
     * On component destroy
     */
    ngOnDestroy() {
        if (this.instance) {
            setTimeout(() => {
                this.instance.removeAllListeners();
                CKEDITOR.instances[this.instance.name].destroy();
                this.instance.destroy();
                this.instance = null;
            });
        }
    }

    /**
     * On component view init
     */
    ngAfterViewInit() {
        // Configuration
        this.ckeditorPreInit(this.config || {});
    }

    /**
     * Value update process
     */
    updateValue(value: any) {
        this.zone.run(() => {
            this.value = value;

            this.onChange(value);

            this.onTouched();
            this.change.emit(value);
        });
    }

    ckeditorPreInit(config: any) {
        // if (typeof CKEDITOR === 'undefined') {
        //     console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        // } else {
        //
        // }

        if (typeof CKEDITOR === 'undefined') {
            if (this.ckeditorJsPath) {
                if (this.ckeditorBasePath) {
                    (<any>window).CKEDITOR_BASEPATH = this.ckeditorBasePath;
                }

                this.loader.load({
                    src: this.ckeditorJsPath
                }).subscribe(() => {
                    this.ckeditorInit(config);
                });

                // require.ensure([
                //     this.ckeditorJsPath
                // ], () => {
                //     require(this.ckeditorJsPath);
                //
                // });
            } else {
                console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
            }
        } else {
            this.ckeditorInit(config);
        }
    }

    /**
     * CKEditor init
     */
    ckeditorInit(config: any) {
        if (this.readonly) {
            config.readOnly = this.readonly;
        }
        // CKEditor replace textarea
        this.instance = CKEDITOR.replace(this.host.nativeElement, config);

        // Set initial value
        this.instance.setData(this.value);

        // listen for instanceReady event
        this.instance.on('instanceReady', (evt: any) => {
            // send the evt to the EventEmitter
            this.ready.emit(evt);
        });

        // CKEditor change event
        this.instance.on('change', () => {
            this.onTouched();
            let value = this.instance.getData();

            // Debounce update
            if (this.debounce) {
                if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.updateValue(value);
                    this.debounceTimeout = null;
                }, parseInt(this.debounce));

                // Live update
            } else {
                this.updateValue(value);
            }
        });

        // CKEditor blur event
        this.instance.on('blur', (evt: any) => {
            this.blur.emit(evt);
        });

        // CKEditor focus event
        this.instance.on('focus', (evt: any) => {
            this.focus.emit(evt);
        });
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value: any) {
        this._value = value;
        if (this.instance)
            this.instance.setData(value);
    }

    onChange(_: any) {
    }

    onTouched() {
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
}
