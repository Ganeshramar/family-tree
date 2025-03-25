import { Injectable } from '@angular/core';

export interface Member {
  id: string;
  name: string;
  age: number;
  relationship: string;
  parentId?: string; // Links the member to their parent
}

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private members: Member[] = [];
  private idCounter: number = 1;

  constructor() {}

  addMember(name: string, age: number, relationship: string, parentId?: string): Member {
    const newMember: Member = {
      id: `${this.idCounter++}`,
      name,
      age,
      relationship,
      parentId,
    };
    this.members.push(newMember);
    return newMember;
  }

  getMembers(): Member[] {
    return this.members;
  }
}