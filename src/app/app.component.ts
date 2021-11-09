import { AfterViewInit, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'outside-angular-zone';

  boxes = new Array(20000).fill(0);

  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;

  containerElement: HTMLEl = null;

  mouseUpBound = null;
  mouseMoveBound = null;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.boxes.forEach((b, index) => {
      this.containerElement = document.getElementById("container" + index);
      this.containerElement.addEventListener('mousedown', this.mouseDown.bind(this));
    })
  }

  // mouseMove(event) {
  //   event.preventDefault();

  //   console.log('move: ', event);

  //   // Calculate new cursor position
  //   // this.elementX = this.startX - event.clientX;
  //   // this.elementY = this.startY - event.clientY;
  //   // this.startX = event.clientX;
  //   // this.startY = event.clientY;

  //   // Set the new element position
  //   if (this.element) {
  //     this.updateBoxPosition(this.element, event.clientX, event.clientY);
  //   }
  // }

  // updateBoxPosition(element, x, y) {
  //   element.setAttribute('offsetTop', Number(y));
  //   element.setAttribute('offsetLeft', Number(x));
  //   console.log('element: ', element);
  // } 

  // mouseUp(event) {
  //   // Only update the UI when the user stops holding mouse down
  //   this.zone.run(() => {
  //     this.updateBoxPosition(this.element, event.clientX, event.clientY);
  //   })
  //   console.log('this.element finished: ', this.element);
  //   this.element = null;
  //   window.document.removeEventListener('mousemove', this.mouseMove);
  // }

    mouseDown = (e) => {
      console.log('mouseDown');
      // Set the draggable element
      this.containerElement = e.target;
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      this.mouseUpBound = this.mouseUp.bind(this);
      window.document.addEventListener('mouseup', this.mouseUpBound);

      this.mouseMoveBound = this.mouseMove.bind(this);

      // Execute this code but don't update the UI
      this.zone.runOutsideAngular(() => {
        window.document.addEventListener('mousemove', this.mouseMoveBound);
      });
    }

    mouseMove = (e) => {
      // console.log('mouseMove');
      e = e || window.event;
      e.preventDefault();
      this.updateElementPosition(e);
    }

    mouseUp = (e) => {
      console.log('mouseUp');

      // Execute this code and do perform change detection and update the UI
      this.zone.run(() => {
        this.updateElementPosition(e);
      })

      window.document.removeEventListener('mousemove', this.mouseMoveBound, false);
      window.document.removeEventListener('mouseup', this.mouseUpBound, false);
    }

    updateElementPosition(e) {
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      // set the element's new position:
      this.containerElement.style.top = (this.containerElement.offsetTop - this.pos2) + "px";
      this.containerElement.style.left = (this.containerElement.offsetLeft - this.pos1) + "px";
    }
}