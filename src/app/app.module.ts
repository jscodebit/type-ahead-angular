import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientService } from 'src/services/http-client.service';

import { AppComponent } from './app.component';
import { NgbdTypeaheadFormatComponent } from './ngbd-typeahead-format/ngbd-typeahead-format.component';

@NgModule({
  declarations: [
    AppComponent,
    NgbdTypeaheadFormatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule,
    HttpClientModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]     
})
export class AppModule { }
