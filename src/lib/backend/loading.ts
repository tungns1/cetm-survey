import { FactoryProvider } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

const loaderID = `loading-${Math.random().toString(36).substr(3, 6)}`;

const loaderDiv = `
    <div id="loading-indicator">
        <i class="fa fa-spin fa-spinner"></i>
        <br>
        <button id="${loaderID}-cancel">Cancel</button>
    </div>
    <style>
        #${loaderID} {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100vh;
            width: 100vw;
            z-index: 0;
            display: none;
            font-size: 100px !important;
            background-color: rgba(0, 0, 0, 0.38);
        }
        
        #loading-indicator {
            position: absolute;
            top: 45vh;
            right: 0;
            bottom: 0;
            left: 45vw;
        }

        #loading-indicator button{
            width:100px;
            height:auto;

            position: relative;
            vertical-align: top;
            padding: 0;
            font-size: 22px;
            color: black;
            text-align: center;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
            background: #f39c12;
            border: 0;
            border-bottom: 2px solid #e8930c;
            cursor: pointer;
            -webkit-box-shadow: inset 0 -2px #e8930c;
            box-shadow: inset 0 -2px #e8930c;
        }
        
        #${loaderID}[active] {
            z-index: 1;
            display: block;
            color: white;
            
        }

        #${loaderID}-cancel {
            color: black;
            font-size: 2vw;
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
            Show();
        } else {
            // setTimeout(_ => {
            //     Hide();
            // }, 2000)
        }
    })
    Start();
}

Start();

export function Show() {
    showCount++;
    if (showCount > 1) {
        return;
    }
    loaderEl.setAttribute("active", "");
}

export function Hide() {
    if (showCount == 0) {
        return;
    }
    showCount--;
    if (showCount < 1) {
        loaderEl.removeAttribute("active");
        return;
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
        Hide();
    }
}

function Stop() {
    if (subscription) {
        subscription.unsubscribe();
        subscription = null;
    }
}