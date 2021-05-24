class Widget {
  protected element: HTMLDivElement;
  protected valueElement: HTMLDivElement;
  protected contentElement: HTMLDivElement;

  constructor(private selector: string) {
    this.element = document.querySelector(this.selector);
    this.valueElement = this.element.querySelector('.widget-value');
    this.contentElement = this.element.querySelector('.widget-content');
  }

  protected updateWidget(value: string): void {
    this.valueElement.innerHTML = value;
  }
}

export default Widget;
