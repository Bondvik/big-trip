import InfoView from '../view/info.js';
import {RenderPosition, render} from '../utils/render';

export default class Info {
  constructor(tripMainContainer) {
    this._tripMainContainer = tripMainContainer;
  }

  init(points) {
    this._points = points.slice();
    this._infoComponent = new InfoView(this._points);
    this._renderInfo();
  }

  _renderInfo() {
    render (this._tripMainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }
}
