import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadProgressComponent } from './components/upload-progress/upload-progress.component';
import { FileSizePipe } from './pipe/file-size.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ScrollTracker } from './directives/scroll-tracker.directive';
import { HeaderForSearchPropertiesComponent } from './components/header-for-search-properties/header-for-search-properties.component';
import { RsbCurrencyPipe } from './pipe/rsb-currency.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UploadProgressComponent,
    FileSizePipe,
    RsbCurrencyPipe,
    SpinnerComponent,
    ImageCropperComponent,
    ConfirmationComponent,
    ForgotpasswordComponent,
    HeaderForSearchPropertiesComponent,
    ScrollTracker
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxIntlTelInputModule,
    ImageCropperModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UploadProgressComponent,
    FileSizePipe,
    RsbCurrencyPipe,
    SpinnerComponent,
    ImageCropperComponent,
    ConfirmationComponent,
    ScrollTracker
  ],
  providers: [
    FileSizePipe
  ]
})
export class SharedModule { }
