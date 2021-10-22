import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListingComponent } from './pages/job-list/job-listing.component';
import { PrimengModule } from '../primeng/primeng.module';
import { JobItemComponent } from './components/job-item/job-item.component';

@NgModule({
  declarations: [JobListingComponent, JobItemComponent],
  imports: [CommonModule, PrimengModule],
})
export class JobsModule {}
