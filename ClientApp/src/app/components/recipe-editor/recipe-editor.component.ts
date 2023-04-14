import {AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import tinymce, {Editor, EditorEvent} from 'tinymce';
import {Recipe} from "../../model/recipe";

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RecipeEditorComponent),
  multi: true
};


@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',//`<textarea #textArea [value]="value"></textarea>`,
  styleUrls: ['./recipe-editor.component.css'],
  providers: [TINYMCE_VALUE_ACCESSOR]
})
export class RecipeEditorComponent implements OnDestroy, ControlValueAccessor, AfterViewInit {

  @ViewChild('textArea') textArea?: ElementRef;

  editor: any;

  value?: string;

  @Input()
  recipe?: Recipe;

  onChange = (_: any) => {
  };

  constructor(private zone: NgZone) {
  }

  writeValue(value: any): void {
    this.value = value;
    if (this.editor) {
      this.editor.setContent(value || '');
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  async ngAfterViewInit() {
    await tinymce.init(this.getInitConfig());
  }

  getInitConfig() {
    return {
      target: this.textArea?.nativeElement,
      base_url: '/tinymce',
      suffix: '.min',
      plugins: 'lists link fullscreen',
      //toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
      toolbar: 'undo redo | styles | fontsize forecolor bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen',
      fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
      placeholder: 'Treść przepisu',
      promotion: false,
      branding: false,
      menubar: false,
      language: 'pl',
      language_url: '/assets/tinymce/pl.js',
      setup: (editor: Editor) => {
        this.editor = editor;
        //editor.on('keyup', this.onChanges(editor));
        editor.on('Change', this.onChanges(editor));
      },
      content_style:
        "@import url('https://fonts.googleapis.com/css2?family=Roboto'); " +
        "body { font-family: Roboto; }"
    };
  }

  private onChanges(editor: Editor) {
    return (event: EditorEvent<any>) => {
      const content = editor.getContent();
      this.zone.run(() => this.onChange(content))
    }
  }
}
