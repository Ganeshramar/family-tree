import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel 2-way binding
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-member-dialog',
  standalone: true, // Declare it as a standalone component
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class AddMemberDialogComponent {
  name: string = '';
  age: number | null = null;
  relationship: string = 'mine'; // Default value for the dropdown
  relationships: string[] = [
    'mine',
    'father',
    'mother',
    'wife',
    'husband',
    'brother',
    'sister',
    'son',
    'daughter',
  ]; // Dropdown options

  constructor(
    public dialogRef: MatDialogRef<AddMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save(): void {
    if (this.isValid()) {
      this.dialogRef.close({
        name: this.name,
        age: this.age,
        relationship: this.relationship,
      });
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  isValid(): boolean {
    return !!this.name.trim() && this.age !== null && !!this.relationship.trim();
  }
}