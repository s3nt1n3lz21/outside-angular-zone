import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'outside-angular-zone';
  number = 0;
  counter = 0;
  numbers: Array<number> = new Array(10000).fill(0);

  constructor(private zone: NgZone) {}

  // For the first 3 seconds the UI is not updated, but the values are
  // After that the UI is updated, notice how much slower it is when we constantly keep
  // updating many elements on the UI.
  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {

        this.counter++;
        console.log('counter: ', this.counter);

        if (this.counter >= 4) {
          this.zone.run(() => {
            this.updateNumbers();
          })
        } else {
          this.updateNumbers();
        }

      }, 1000);
    });
  };

  updateNumbers() {
    for (let index = 0; index < this.numbers.length; index++) {
      this.numbers[index] += 1; 
    }
  }
}