import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private seats: boolean[] = new Array(80).fill(false); // Initialize 80 seats as unbooked

  constructor() {
    // Example: Pre-book some seats
    this.seats[1] = true;
    this.seats[2] = true;
  }

  getAvailableSeats(): boolean[] {
    return this.seats;
  }

  bookRequestedSeats(requestedSeats: number): number[] {
    const bookedSeats: number[] = [];

    for (let row = 0; row < 12; row++) { // 11 rows (7 seats each) + 1 last row (3 seats)
      let rowStart = row * 7;
      let rowSeats = row < 11 ? 7 : 3; // 7 seats per row except the last row has 3 seats

      let availableInRow = 0;
      let tempSeats = [];

      for (let j = rowStart; j < rowStart + rowSeats; j++) {
        if (!this.seats[j]) {
          tempSeats.push(j + 1);
          availableInRow++;
          if (availableInRow === requestedSeats) break;
        }
      }

      if (availableInRow >= requestedSeats) {
        tempSeats.slice(0, requestedSeats).forEach(seat => {
          this.seats[seat - 1] = true;
          bookedSeats.push(seat);
        });
        return bookedSeats;
      }
    }

    return bookedSeats;
  }
}
