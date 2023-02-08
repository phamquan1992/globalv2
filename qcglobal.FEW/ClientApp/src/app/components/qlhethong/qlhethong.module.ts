import { EditsysPermissionComponent } from './tacvu/editsys-permission/editsys-permission.component';
import { QlhethongComponent } from './qlhethong.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QlhethongRoutingModule } from './qlhethong-routing.module';
import { ChucnangComponent } from './chucnang/chucnang.component';
import { TacvuComponent } from './tacvu/tacvu.component';
import { VaitroComponent } from './vaitro/vaitro.component';
import { LogsystemComponent } from './logsystem/logsystem.component';
import { EditsysFunctionComponent } from './chucnang/editsys-function/editsys-function.component';
import { EditsysRoleComponent } from './vaitro/editsys-role/editsys-role.component';
import { NguoidungComponent } from './nguoidung/nguoidung.component';
import { EdituserdataComponent } from './nguoidung/edituserdata/edituserdata.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    QlhethongComponent,
    ChucnangComponent,
    TacvuComponent,
    VaitroComponent,
    LogsystemComponent,
    EditsysFunctionComponent,
    EditsysPermissionComponent,
    EditsysRoleComponent,
    NguoidungComponent,
    EdituserdataComponent
  ],
  imports: [
    CommonModule,
    QlhethongRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ]
})
export class QlhethongModule { }
