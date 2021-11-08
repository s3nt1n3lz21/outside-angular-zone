import { AfterViewInit, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'outside-angular-zone';
  element: HTMLElement = null;
  elementX = 0;
  elementY = 0
  startX = 0;
  startY = 0;
  boxes = new Array(10).fill(0);

  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  containerElement = null;

  mouseUpBound = null;
  mouseMoveBound = null;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.boxes.forEach((b, index) => {
      this.containerElement = document.getElementById("container" + index);
      this.pos1 = 0; 
      this.pos2 = 0;
      this.pos3 = 0;
      this.pos4 = 0;
      if (document.getElementById("header" + index)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById("header" + index).addEventListener('mousedown', this.mouseDown.bind(this));
        // document.getElementById(containerElement.id + "header").onmousedown = this.mouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        this.containerElement.onmousedown = this.mouseDown;
      }
    })
  }

  // mouseDown(event) {

  //   // Get initial element position
  //   this.startX = event.clientX;
  //   this.startY = event.clientY;
    
  //   // Keep a reference to the target element
  //   this.element = event.target;
  //   console.log('mousedown target: ', this.element);

  //   // Execute this code but don't update the UI on every mousemove event
  //   this.zone.runOutsideAngular(() => {
  //     window.document.addEventListener('mousemove', this.mouseMove.bind(this));
  //   });
  // }

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












    dragElement = (containerElement) => {

    }

    mouseDown = (e) => {
      console.log('targetElement: ', e.target.parentElement);
       this.containerElement = e.target.parentElement;
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      console.log('mouseDown');
      this.mouseUpBound = this.moveDown.bind(this);
      window.document.addEventListener('mouseup', this.mouseUpBound);

      // call a function whenever the cursor moves:
      // document.onmousemove = this.mouseMove;
      console.log('this: ', this);
      this.mouseMoveBound = this.mouseMove.bind(this);
      window.document.addEventListener('mousemove', this.mouseMoveBound);
    }

    mouseMove = (e) => {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      console.log('mouseMove');
      // set the element's new position:
      this.containerElement.style.top = (this.containerElement.offsetTop - this.pos2) + "px";
      this.containerElement.style.left = (this.containerElement.offsetLeft - this.pos1) + "px";
    }

    moveDown = () => {

      /* stop moving when mouse button is released:*/
      window.document.removeEventListener('mousemove', this.mouseMoveBound, false);
      window.document.removeEventListener('mouseup', this.mouseUpBound, false);
      console.log('mouseUp');
      // document.onmouseup = null;
      // document.onmousemove = null;
    }
}