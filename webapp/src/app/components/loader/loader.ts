import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.html'
})
export class Loader {
  loaderService = inject(LoaderService);
  isLoading = this.loaderService.isLoading;
}
