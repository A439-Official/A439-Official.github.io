// 自定义下拉列表
class CustomSelect {
    constructor(container, options, selectedIndex = 0, onChange) {
        this.container = container;
        this.options = options;
        this.selectedIndex = selectedIndex;
        this.onChange = onChange;
        this.isOpen = false;

        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = "";
        this.container.className = "custom-select";

        // 显示选中的值
        this.displayElement = document.createElement("div");
        this.displayElement.className = "custom-select-display";
        this.displayElement.textContent = this.options[this.selectedIndex];

        // 下拉箭头
        const arrow = document.createElement("span");
        arrow.className = "custom-select-arrow";
        arrow.innerHTML = "&#9660;";

        this.displayElement.appendChild(arrow);
        this.container.appendChild(this.displayElement);

        // 选项列表
        this.optionsList = document.createElement("ul");
        this.optionsList.className = "custom-select-options";

        this.options.forEach((option, index) => {
            const li = document.createElement("li");
            li.className = `custom-select-option ${index === this.selectedIndex ? "custom-select-option-selected" : ""}`;
            li.textContent = option;
            li.dataset.index = index;
            this.optionsList.appendChild(li);
        });

        this.container.appendChild(this.optionsList);
        this.updateDisplay();
    }

    bindEvents() {
        this.displayElement.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.optionsList.addEventListener("click", (e) => {
            const option = e.target.closest(".custom-select-option");
            if (option) {
                const index = parseInt(option.dataset.index);
                this.select(index);
                this.close();
            }
        });

        document.addEventListener("click", () => {
            this.close();
        });

        this.optionsList.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.container.classList.add("custom-select-open");
        this.optionsList.style.display = "block";
        this.displayElement.classList.add("custom-select-display-open");
    }

    close() {
        this.isOpen = false;
        this.container.classList.remove("custom-select-open");
        this.optionsList.style.display = "none";
        this.displayElement.classList.remove("custom-select-display-open");
    }

    select(index) {
        if (index >= 0 && index < this.options.length) {
            this.optionsList.querySelectorAll(".custom-select-option").forEach((option, i) => {
                option.classList.toggle("custom-select-option-selected", i === index);
            });
            this.selectedIndex = index;
            this.updateDisplay();

            if (this.onChange) {
                this.onChange(index);
            }
        }
    }

    updateDisplay() {
        const textNode = this.displayElement.childNodes[0];
        if (textNode.nodeType === Node.TEXT_NODE) {
            textNode.textContent = this.options[this.selectedIndex];
        }
    }

    getValue() {
        return this.selectedIndex;
    }

    setValue(index) {
        this.select(index);
    }
}
