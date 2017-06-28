import { FactoryProvider } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

const loaderID = `loading-${Math.random().toString(36).substr(3, 6)}`;

const loaderDiv = `
        <i id="loading-icon" class="fa fa-spin fa-spinner"></i>
        <br>
        <button id="${loaderID}-cancel" class="btnFill">Cancel</button>
    <style>
        #${loaderID} {
            position: fixed;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 100%;
            z-index: 0;
            display: none;
            font-size: 100px !important;
            background-color: rgba(0, 0, 0, 0.6);
        } 
        
        #loading-icon{
            position: absolute;
            top: 40%;
            left: 48%;
        }

        #${loaderID}-cancel{
            position: absolute;
            top: 55%;
            left: 46%;
            width: 8%;
        }
        
        #${loaderID}[active] {
            z-index: 3;
            display: block;
            color: white;
        }
    </style>
`;

var loaderEl: HTMLElement;
var showCount = 0;
var subscription: Subscription;

export function ListenToRouter(router: Router) {
    Stop();
    subscription = router.events.subscribe(e => {
        if (e instanceof NavigationStart) {
            ShowLoading();
        } else {
            setTimeout(_ => {
                HideLoading();
            }, 10);
        }
    })
    Start();
}

Start();

const loadingDelay = 10;

export function ShowLoading() {
    showCount++;
    if (showCount > 1) {
        return;
    }
    loaderEl.setAttribute("active", "");
}

export function HideLoading() {
    if (showCount == 0) {
        return;
    }
    showCount--;
    if (showCount < 1) {
        setTimeout(_ => {
            loaderEl.removeAttribute("active");
            return;
        }, loadingDelay);
    }
}

function Start() {
    if (loaderEl) {
        return;
    }
    loaderEl = document.createElement("div");
    loaderEl.id = loaderID;
    loaderEl.innerHTML = loaderDiv;
    document.body.appendChild(loaderEl);
    document.getElementById(`${loaderID}-cancel`).onclick = () => {
        showCount = 1;
        HideLoading();
    }
}

function Stop() {
    if (subscription) {
        subscription.unsubscribe();
        subscription = null;
    }
}