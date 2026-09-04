import { Component, inject, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../types/user';

@Component({
    selector: 'app-users',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    templateUrl: './users.html'
})
export class Users {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userService = inject(UserService);
  authService = inject(AuthService);
  toast = inject(ToastrService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.userService.getUsers().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* API also blocks self */
  isSelf(row: User): boolean {
    return this.authService.user()?.id === row.id;
  }

  toggleRole(row: User) {
    this.userService.setUserRole(row.id, !row.isAdmin).subscribe({
      next: () => {
        this.toast.success('Success', row.isAdmin ? 'Admin access removed' : 'Admin access granted');
        this.getServerData();
      },
      error: (err) => this.toast.error('Failed', err.error?.error ?? 'Could not update role')
    });
  }

  delete(row: User) {
    this.userService.deleteUserById(row.id).subscribe({
      next: () => {
        this.toast.warning('Success', 'User Deleted');
        this.getServerData();
      },
      error: (err) => this.toast.error('Failed', err.error?.error ?? 'Could not delete user')
    });
  }
}
