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
        this.container.className = "select";

        this.displayElement = document.createElement("div");
        this.displayElement.className = "select-display";
        this.displayElement.textContent = this.options[this.selectedIndex];

        const arrow = document.createElement("span");
        arrow.className = "select-arrow";
        arrow.innerHTML = "&#9660;";

        this.displayElement.appendChild(arrow);
        this.container.appendChild(this.displayElement);

        // 选项列表
        this.optionsList = document.createElement("ul");
        this.optionsList.className = "select-options";

        this.options.forEach((option, index) => {
            const li = document.createElement("li");
            li.className = `option ${index === this.selectedIndex ? "selected" : ""}`;
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
            const option = e.target.closest(".option");
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
        this.container.classList.add("open");
        this.style.display = "block";
        this.optionsList.style.display = "block";
        this.displayElement.classList.add("open");
    }
    close() {
        this.isOpen = false;
        this.container.classList.remove("open");
        this.style.display = "none";
        this.optionsList.style.display = "none";
        this.displayElement.classList.remove("open");
    }
    select(index) {
        if (index >= 0 && index < this.options.length) {
            this.optionsList.querySelectorAll(".option").forEach((option, i) => {
                option.classList.toggle("selected", i === index);
            });
            this.selectedIndex = index;
            this.updateDisplay();
            if (this.onChange) {
                this.onChange(index);
            }
        }
    }
    updateDisplay() {
        this.displayElement.firstChild.textContent = this.options[this.selectedIndex];
    }
    getValue() {
        return this.selectedIndex;
    }
    setValue(index) {
        this.select(index);
    }
}
