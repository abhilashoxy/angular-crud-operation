import {  MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { DeleteComponent } from './dialoge/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './dialoge/edit/edit.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddComponent } from './dialogue/add/add.component';
import {MatCardModule} from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule} from '@angular/material/progress-bar'
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    NavbarComponent,
    DeleteComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatSortModule,
    MatProgressBarModule,
    TranslateModule.forRoot({
      loader: {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient]
      }
})
  ],
  providers: [], 
  bootstrap: [AppComponent],
  entryComponents: [DeleteComponent]
})
export class AppModule { }
