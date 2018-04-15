import { Output } from './output';

export class Outputslot {
    constructor(
    public endTime: number,
    public actions: Output[],
    public fluents: Output[],
  ) { }
}
