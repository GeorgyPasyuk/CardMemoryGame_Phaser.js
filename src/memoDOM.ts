type MenuRenderProps = {
  type: "start" | "end";
  isWin?: boolean;
};

export class MemoDOM {
  private _elementDOM: HTMLElement;

  onStartGame: () => unknown | null
  onRestartGame: () => unknown | null

  render({ type, isWin }: MenuRenderProps) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML =
      type === "start" ? this.startTemplate() : this.restartTemplate(isWin);

    this._elementDOM = wrapper.firstElementChild as HTMLElement;

    const buttonDOM = this._elementDOM.querySelector("button") as HTMLElement;

    buttonDOM.onclick = () => {
      this._elementDOM.remove();

      type === 'start' ? this.onStartGame?.() : this.onRestartGame?.()

    };

    document.body.append(this._elementDOM);
  }

  private startTemplate = () => `
            <div class='menu'>
                <span>Игра</span>
                <button>Начать</button>
            <div/>`;

  private restartTemplate = (isWin?: boolean) => `
            <div class='menu'>
                <span>${isWin ? "ПОБЕДА" : "ПОРАЖЕНИЕ"}</span>
                <button>Играть снова</button>
            <div/>`;
}
