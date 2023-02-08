import { NguoidungComponent } from './nguoidung/nguoidung.component';
import { LogsystemComponent } from './logsystem/logsystem.component';
import { VaitroComponent } from './vaitro/vaitro.component';
import { TacvuComponent } from './tacvu/tacvu.component';
import { ChucnangComponent } from './chucnang/chucnang.component';
import { QlhethongComponent } from './qlhethong.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', component: QlhethongComponent,
  children: [
    { path: 'nguoidung', component: NguoidungComponent },
    { path: 'chucnang', component: ChucnangComponent },
    { path: 'tacvu', component: TacvuComponent },
    { path: 'vaitro', component: VaitroComponent },
    { path: 'logsystem', component: LogsystemComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QlhethongRoutingModule { }
