import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../member.service';

@Component({
  selector: 'app-family-card',
  standalone: true,
  templateUrl: './family-card.component.html',
  styleUrls: ['./family-card.component.scss'],
  imports: [CommonModule], // Import CommonModule for standalone usage
})
export class FamilyCardComponent {
  @Input() member!: Member; // Member passed from parent
  @Output() addRelation = new EventEmitter<string>(); // Emit relationship when "Add Relation" is clicked

  /**
   * Get background color based on relationship
   */
  getBackgroundColor(): string {
    switch (this.member.relationship) {
      case 'father':
      case 'mother':
        return '#FFD700'; // Yellow for parents
      case 'brother':
      case 'sister':
        return '#87CEEB'; // Blue for siblings
      case 'son':
      case 'daughter':
        return '#32CD32'; // Green for children
      case 'wife':
      case 'husband':
        return '#FF69B4'; // Pink for spouse
      default:
        return '#D3D3D3'; // Default grey
    }
  }

  /**
   * Get emoji based on relationship
   */
  getEmoji(): string {
    switch (this.member.relationship) {
      case 'father':
      case 'mother':
        return '👪';
      case 'brother':
      case 'sister':
        return '👫';
      case 'son':
      case 'daughter':
        return '👶';
      case 'wife':
      case 'husband':
        return '❤️';
      default:
        return '🤔';
    }
  }
}