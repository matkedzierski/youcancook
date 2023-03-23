import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fav-badge',
  templateUrl: './fav-badge.component.html',
  styleUrls: ['./fav-badge.component.scss']
})
export class FavBadgeComponent implements OnInit {

  @Input()
  isFav?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
