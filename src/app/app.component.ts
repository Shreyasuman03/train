import { Component } from '@angular/core';
import { SeatService } from './seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Train Seat Reservation';
  availableSeats: boolean[];
  bookedSeats: number[] = [];
  requestedSeats: number = 0;

  constructor(private seatService: SeatService) {
    this.availableSeats = this.seatService.getAvailableSeats();
  }

  reserveSeats() {
    this.bookedSeats = this.seatService.bookRequestedSeats(this.requestedSeats);
    
    if (this.bookedSeats.length) {
      alert(`Booked Seats: ${this.bookedSeats.join(', ')}`);
      this.availableSeats = this.seatService.getAvailableSeats(); // Refresh available seats
    } else {
      alert("Not enough seats available to fulfill your request.");
    }
    
    this.requestedSeats = 0; // Reset input
  }
}
