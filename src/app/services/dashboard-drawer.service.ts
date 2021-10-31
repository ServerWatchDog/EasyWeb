import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardDrawerService {
  drawer = true;

  constructor() {
  }

  toggle() {
    this.drawer = !this.drawer
  }

}
