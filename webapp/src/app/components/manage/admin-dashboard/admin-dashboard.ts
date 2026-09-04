import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    imports: [MatButtonModule, RouterLink],
    templateUrl: './admin-dashboard.html'
})
export class AdminDashboard {

}
