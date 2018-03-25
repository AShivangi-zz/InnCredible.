import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-err-display',
  templateUrl: './err-display.component.html',
  styleUrls: ['./err-display.component.scss']
})
export class ErrDisplayComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;

  ngOnInit() {
  }
}
