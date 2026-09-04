import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  /* In-flight request count; the overlay shows while it is above zero */
  private readonly requestCount = signal(0);

  readonly isLoading = computed(() => this.requestCount() > 0);

  show() {
    this.requestCount.update((count) => count + 1);
  }

  hide() {
    this.requestCount.update((count) => (count > 0 ? count - 1 : 0));
  }
}
