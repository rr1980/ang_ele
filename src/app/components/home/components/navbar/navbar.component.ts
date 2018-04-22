import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserViewModel } from '../../../../models/app-state.model';
import { AppStoreService } from '../../../../services/app-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userViewModel: UserViewModel;
  sub: Subscription;

  constructor(private appStoreService: AppStoreService) { };

  ngOnInit() {
    this.sub = this.appStoreService.get('setLogin').subscribe((response) => {
      this.userViewModel = response as UserViewModel;
    });
  };

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
};