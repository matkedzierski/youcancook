import {Component, Input, OnInit} from '@angular/core';
import {Difficulty} from "../../../model/difficulty.enum";

@Component({
  selector: 'app-level-badge',
  templateUrl: './level-badge.component.html',
  styleUrls: ['./level-badge.component.scss']
})
export class LevelBadgeComponent implements OnInit {

  @Input()
  level?: Difficulty;
  colors: Map<Difficulty, string> = new Map([
    [Difficulty.Easy,  "#079d07"],
    [Difficulty.Medium,  "#1082d7"],
    [Difficulty.Hard,  "#de1b14"],
    ])
  texts: Map<Difficulty, string> = new Map([
    [Difficulty.Easy,  "Łatwy"],
    [Difficulty.Medium,  "Średni"],
    [Difficulty.Hard,  "Trudny"],
    ])
  constructor() { }

  ngOnInit(): void {
  }

}
