import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and other directives
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { FamilyCardComponent } from '../family-card/family-card.component'; // Import FamilyCardComponent
import { MemberService, Member } from '../member.service';

@Component({
  selector: 'app-family-tree',
  standalone: true,
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss'],
  imports: [CommonModule, MatDialogModule, FamilyCardComponent], // Include CommonModule
})
export class FamilyTreeComponent implements OnInit {
  members: Member[] = []; // List of family members

  constructor(private memberService: MemberService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Automatically open "mine" dialog on initial page load
    if (this.members.length === 0) {
      this.openAddMemberPopup('mine'); // Adds first root node
    }
  }

  /**
   * Opens Add Member dialog
   * @param relationship - The new member's relationship
   * @param parentId - The parent member's ID (optional)
   */
  openAddMemberPopup(relationship: string, parentId?: string): void {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '400px',
      data: { relationship },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newMember: Member = this.memberService.addMember(
          result.name,
          result.age,
          result.relationship,
          parentId
        );
        this.members.push(newMember); // Add to the members array
      }
    });
  }

  /**
   * Retrieves members based on `parentId`
   * @param parentId Optional parameter to filter by parent ID
   * @returns Filtered array of members
   */
  getMembersByParentId(parentId?: string): Member[] {
    return this.members.filter((m) => m.parentId === parentId);
  }
}