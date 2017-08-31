import {Injectable} from '@angular/core';

export class Svg {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  fill: string;
  points: string;
  private _id: number;

  constructor(id: number, points: string, fill: string) {
    this._id = id;
    this.points = this.points;
    this.fill = fill;
  }
}

@Injectable()
export class SvgServiceService {

  constructor() {
  }

  getSvgs(): Promise<Svg[]> {
    return Promise.resolve([
      new Svg(1, '125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2', 'red'),
      new Svg(2, '125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2', 'green'),
      new Svg(3, '125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2', 'blue'),
    ]);
  }
}
