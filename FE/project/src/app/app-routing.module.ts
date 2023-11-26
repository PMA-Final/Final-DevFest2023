import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { RecommendComponent } from './recommend/recommend.component';


const routes: Routes = [
  {path: '', component: ChartComponent},
  {path: 'recommend', component: RecommendComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
