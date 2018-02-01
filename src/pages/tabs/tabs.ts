import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { AlarmPage } from '../alarm/alarm';
import { MemoPage } from '../memo/memo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AlarmPage;
  tab3Root = MemoPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
