
const POSITION = {
    TOP_RIGHT: 'toast-top-right'
}

const ICON_CLASS = {
    ERROR: 'toast-error'
}

const STATUS = {
    ERROR: 'error',
    INFO: 'info',
    SUCCES: 'success',
    WARNING: 'warning'
};


const DEFAULT = {
    tapToDismiss: true,
    toastClass: 'toast',
    containerId: 'toast-container',
    debug: false,

    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
    showDuration: 300,
    showEasing: 'swing', //swing and linear are built into jQuery
    onShown: undefined,
    hideMethod: 'fadeOut',
    hideDuration: 1000,
    hideEasing: 'swing',
    onHidden: undefined,
    closeMethod: false,
    closeDuration: false,
    closeEasing: false,
    closeOnHover: true,

    extendedTimeOut: 1000,
    iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
    },
    iconClass: 'toast-info',
    positionClass: 'toast-top-right',
    timeOut: 3000, // Set timeOut and extendedTimeOut to 0 to make it sticky
    titleClass: 'toast-title',
    messageClass: 'toast-message',
    escapeHtml: false,
    target: 'body',
    closeHtml: '<button type="button">&times;</button>',
    closeClass: 'toast-close-button',
    newestOnTop: true,
    preventDuplicates: false,
    progressBar: false,
    progressClass: 'toast-progress',
    rtl: false
}

const containerEl = document.createElement('div');
document.body.appendChild(containerEl);
containerEl.id = DEFAULT.containerId;
containerEl.classList.add(POSITION.TOP_RIGHT);

function clear($toastElement, clearOptions) {
    for (let i = containerEl.children.length - 1; i >= 0; i--) {
        containerEl.removeChild(containerEl.children.item(i));
    }
}

function escapeHtml(source) {
    if (source == null) {
        source = '';
    }

    return source
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export class Toast {
    constructor() {
        this.SetIcon();
        this.SetCloseButton();
        this.el.classList.add(DEFAULT.toastClass);
        setTimeout(this.Hide.bind(this), DEFAULT.timeOut);
    }

    private el = document.createElement('div');
    private title = document.createElement('div');
    private mesage = document.createElement('div');
    private close = document.createElement('div');

    Show() {
        containerEl.appendChild(this.el);
    }

    Hide() {
        containerEl.removeChild(this.el);
    }

    SetIcon() {
        this.el.classList.add(DEFAULT.toastClass, DEFAULT.iconClass);
    }

    SetTitle(title:string) {
        this.title.innerHTML = title;
        this.title.classList.add(DEFAULT.titleClass);
    }

    SetMessage(mesage:string) {
        this.mesage.innerHTML = mesage;
        this.el.appendChild(this.mesage);
    }

    SetCloseButton() {
        this.close.innerHTML = "x";
        this.close.classList.add(DEFAULT.closeClass);
        this.el.appendChild(this.close);
    }
}
