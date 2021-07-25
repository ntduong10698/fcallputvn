function requestPermissionForPushNotifications() {
    try {
        if (typeof Notification === 'undefined' || !Notification || !Notification.requestPermission) {
            return;
        }
        Notification.requestPermission().then(function(result) {

        });
    } catch (e) {}
}

function saveUsersClientSettings(saveUsersClientSettingsPeriod, clientType) {
    try {
        if (typeof navigator === 'undefined' || !navigator || !navigator.userAgent || typeof Notification === 'undefined' || !Notification || !Notification.permission || !window || !window.localStorage) {
            return;
        }
        const now = Date.now();
        const lastClientSettingsSavedAt = parseInt(window.localStorage.getItem('last_client_settings_saved_at'));

        if (lastClientSettingsSavedAt && !isNaN(lastClientSettingsSavedAt) && now > lastClientSettingsSavedAt + saveUsersClientSettingsPeriod) {
            return;
        }

        const json = {
            clientType: clientType,
            clientUseragent: navigator.userAgent,
            clientNotificationPerm: Notification.permission,
        };

        return ajax('/profile/save-client-settings', {
            json
        }).then(resp => {
            window.localStorage.setItem('last_client_settings_saved_at', now);
            return resp;
        });
    } catch (e) {}
}

function sendNotification(title, body, icon, closeDelay) {
    const notificationObj = new Notification(title, {
        body
    });
    notificationObj.onclick = function() {
        // console.log('onclick');
        notificationObj.close();
    };
    setTimeout(function() {
        // console.log('setTimeout');
        notificationObj.close();
    }, (closeDelay || 5000));
}

function canUseWebp() {
    let elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}

$(document).ready(function() {
    $(".brokers-links").click(function(e) {
        e.preventDefault();
        var h = $(this).attr('href');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(h).offset().top
        }, 1000);
    });

    $('#country_autocomlite').on('keyup', function() {
        if ($(this).val().length > 1) {
            var that = $(this);
            $.ajax({
                type: 'get',
                url: that.data('url'),
                data: {
                    term: that.val()
                },
                dataType: 'html',
                success: function(html) {
                    $('#modal__location .variable-location').html(html);
                }
            });
        }
    });

    if (window.location.hash == '#alerts') {
        $('.js_check-input').prop("checked", true);
        $('.js_alerts').addClass('active');
        $('.js_pro_accounts').removeClass('active');
        $('#accounts_tab a[href="#alerts_tab"]').tab('show');
    }

    /**
     * timer
     * @param {Date} endtime
     * @return {{total: number, hours: number, seconds: number, minutes: number, days: number}}
     */
    function getTimeRemaining(endtime) {
        const total = endtime - new Date();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    /**
     *
     * @param {String} id
     * @param {Date} endtime
     */
    function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const daysSpan = clock.querySelector('.days');
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            const t = getTimeRemaining(endtime);
            if (t.days > 0) {
                daysSpan.innerHTML = t.days;
                $('.countdown-number__days')
                    .css({
                        display: 'block'
                    }).removeClass('hide');
                $('.countdown-dots__days').removeClass('hide');
            }
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
                document.location.reload();
            }
        }

        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
    }

    if (typeof DURATION !== 'undefined') {
        const deadline = new Date(Date.parse(new Date()) + DURATION * 1000); // for endless timer
        // var deadline = new Date(Date.parse(new Date() + DURATION)); // for endless timer
        initializeClock('countdown', deadline);
    }


    $('#google-btn').on('click', function(e) {
        e.preventDefault();
        $('.auth-clients .google.auth-link').trigger('click');
    });

    $('.btn-view').on('click', function() {
        if (!$(this).hasClass('active')) {
            $(this).closest('.form-group').find('input').attr('type', 'text');
        } else {
            $(this).closest('.form-group').find('input').attr('type', 'password');
        }
        $(this).toggleClass('active');
    });

    $('.subscribe-btn').on('change', function() {
        $('#subscribe-form').submit();
    });

    $('.js_check-input').on('change', function() {
        if ($(this).prop("checked")) {
            $('.js_alerts').addClass('active');
            $('.js_pro_accounts').removeClass('active');
            $('#accounts_tab a[href="#alerts_tab"]').tab('show');
        } else {
            $('.js_pro_accounts').addClass('active');
            $('.js_alerts').removeClass('active');
            $('#accounts_tab a[href="#pro_accounts_tab"]').tab('show');
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    checkWebpSupport(canUseWebp());
    openSignalsAddClickEventListener();
    redirectToBrokerOnDownloadAppEventListenerInit();
    copyToClipboardEventListenerInit();
    clickEventListenerInit();
    koApplyBindingsDynamic();
    clickEventListenersInit();
});

function checkWebpSupport(canUseWebp) {
    const elements = document.querySelectorAll('[data-webp]');
    if (elements) {
        elements.forEach(element => element.classList.add(canUseWebp ? 'webp' : 'no-webp'));
    }
}

function clickEventListenerInit() {
    const elements = document.querySelectorAll('[data-click-handler]');
    elements.forEach(element => element.addEventListener('click', window[element.dataset.clickHandler]));
}

function clickEventListenersInit() {
    const elements = document.querySelectorAll('[data-bind-on-click]');
    elements.forEach(element => element.addEventListener('click', window[element.dataset.bindOnClick]));
}

function koApplyBindingsDynamic() {
    const containers = document.querySelectorAll('[data-knockout-view-model]');
    containers.forEach(container => ko.applyBindings(new window[container.dataset.knockoutViewModel](), container));
}

function copyToClipboardEventListenerInit() {
    const elements = document.querySelectorAll('[data-copy-to-clipboard]');
    elements.forEach(element => element.addEventListener('click', () => {
        const container = document.querySelector(element.dataset.copyToClipboard);
        if (!container) return;
        copyToClipboard((container.value || container.innerHTML));
        if (element.dataset.copiedToClipboard) {
            const copied = document.querySelector(element.dataset.copiedToClipboard);
            if (!copied) return;
            copied.style.display = element.style.display;
            element.style.display = 'none';
            setTimeout(() => {
                element.style.display = copied.style.display;
                copied.style.display = 'none';
            }, 600);
        }
    }));
}

function copyToClipboard(text) {
    const input = document.createElement('textarea');
    input.type = 'text';
    input.value = text;
    document.body.append(input);
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(input);
}

function redirectToBrokerOnDownloadAppEventListenerInit() {
    const links = document.querySelectorAll('[data-download-vfxapp]');
    links.forEach(link => link.addEventListener('click', redirectToBrokerOnDownloadApp));
}

function openSignalsAddClickEventListener() {
    const links = document.querySelectorAll('[data-open-signals]');
    links.forEach(link => link.addEventListener('click', openSingleWindow5));
}

function openSingleWindow5(event) {
    const w = window.open('about:blank', '_blank', 'height=800,width=258,resizable=false');
    w.location = "https://app.vfxalert.com";
    if (event.currentTarget.dataset.redirectAfterClick) {
        window.location.href = event.currentTarget.dataset.redirectAfterClick;
    }
}

function redirectToBrokerOnDownloadApp(event) {
    if (event.currentTarget.dataset.redirectAfterClick) {
        event.preventDefault();
        const downloadWindow = window.open();
        downloadWindow.location.href = event.currentTarget.href;
        window.location = event.currentTarget.dataset.redirectAfterClick;
    }
}

/**
 * @param {string} key
 * @param {string} value
 * @param {string} [containerName="default"]
 */
function showFlashMessage(key, value, containerName = 'default') {
    const container = document.querySelector(`[data-alerts-container="${containerName}"]`);
    if (!container) throw new Error(`element with selector not found: [data-alerts-container="${containerName}"]`);
    const keyCssClassMap = {
        success: 'alert-success',
        info: 'alert-info',
        error: 'alert-danger',
    };

    const typeCssClass = keyCssClassMap[key] ? keyCssClassMap[key] : '';
    const alertHTML = `<div id="w0-success-0" class="${typeCssClass} alert alert-dismissible" role="alert">${value}<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button></div>`;
    container.insertAdjacentHTML('beforeend', alertHTML);
}

// function open_single_window3(){
//     var w = window.open('about:blank', '_blank',"height=600,width=205,resizable=yes");
//     w.location = "https://vfxalert.com/signals/single3";
//     window.screenX = 200;
//     setTimeout('goto_default_broker()',1000);
//     //window.location = "http://vfxalert.ru/r/?vr=IQoption&vfxaction=newwnd";
// }
// function goto_default_broker() {
//     window.location = "https://vfxalert.com/r/?vr=default&vfxaction=newwnd";
// }


// COMMON //

/**
 * @param {string} string
 * @param {string[]} chars
 * @return {string}
 */
function vfxLTrim(string, chars) {
    let regexp = `^(${chars.map(char => `${char}+`).join('|')})`;
    return string.replace(new RegExp(regexp, 'g'), '');
}

/**
 * @param {string} string
 * @param {string[]} chars
 * @return {string}
 */
function vfxRTrim(string, chars) {
    let regexp = `(${chars.map(char => `${char}+`).join('|')})$`;
    return string.replace(new RegExp(regexp, 'g'), '');
}

/**
 * @param {string} string
 * @param {string[]} chars
 * @return {string}
 */
function vfxTrim(string, chars) {
    return vfxLTrim(vfxRTrim(string, chars), chars);
}

/**
 * @param {number} value
 * @param {object} [options = {}]
 * @return {string}
 */
function currencyFormat(value, options = {}) {
    const fixed = (options.hideFraction && (value % 1 === 0)) ? 0 : 2;
    const symbol = options.postfixSymbol.toUpperCase() === 'USD' ? ' $' : '';
    return `${symbol}${value.toFixed(fixed)}`;
}

function vfxDiv(val, by) {
    return (val - val % by) / by;
}

/**
 *
 * @param {number} amount
 * @param {number} [divide = 100]
 * @param {number} [fixedDecimals = 2]
 * @param {number} [floatDecimals = 2]
 * @param {string} [decPoint = '.']
 * @param {string} [thousandsSep = ' ']
 * @return {string}
 */
function formatCurrencyString(amount, divide, fixedDecimals, floatDecimals, decPoint, thousandsSep) {
    if (typeof divide === 'undefined') divide = 100;
    if (typeof fixedDecimals === 'undefined') fixedDecimals = 2;
    if (typeof floatDecimals === 'undefined') floatDecimals = 2;
    if (typeof decPoint === 'undefined') decPoint = '.';
    if (typeof thousandsSep === 'undefined') thousandsSep = ' ';
    let str = (amount / divide).toFixed(Math.max(fixedDecimals, floatDecimals));
    const strParts = str.split('.');
    if (strParts[1]) {
        strParts[1] = vfxRTrim(strParts[1], ['0']);
        strParts[1] = strParts[1].padEnd(fixedDecimals, '0');
    }

    const start = strParts[0].length % 3;
    const thousands = [strParts[0].substr(0, start)];
    for (let i = start; i < strParts[0].length; i += 3) {
        thousands.push(strParts[0].substr(i, 3));
    }
    strParts[1] = thousands.filter(item => item.length).join(thousandsSep);
}

function locationApplyDiffQuery(diffQuery) {
    let baseUrl = window.location.href;
    const i = window.location.href.indexOf('?');
    if (i !== -1) {
        baseUrl = window.location.href.substring(0, i);
    }
    const urlParams = new URLSearchParams(window.location.search);
    for (const key in diffQuery) {
        if (!diffQuery.hasOwnProperty(key)) continue;
        if (urlParams.has(key) && (typeof diffQuery[key] === 'undefined' || diffQuery[key] === null)) {
            urlParams.delete(key);
        } else {
            urlParams.set(key, diffQuery[key]);
        }
    }
    const query = urlParams;
    const url = baseUrl + (query ? ('?' + query) : '');
    window.history.replaceState(null, null, url);
}

/**
 * @param {string|URL} url
 * @constructor
 */
function VfxLocation(url) {
    url = new URL(url);

    /**
     * @param {{[string]: string|null|undefined}} diffQuery
     * @return {VfxLocation}
     */
    this.applyDiffQuery = diffQuery => {
        for (const key in diffQuery) {
            if (!diffQuery.hasOwnProperty(key)) continue;
            if (url.searchParams.has(key) && (typeof diffQuery[key] === 'undefined' || diffQuery[key] === null)) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, diffQuery[key]);
            }
            return this;
        }
    };

    /**
     * @return {string}
     */
    this.toString = () => {
        return url.toString();
    };

    /**
     * @param {string} name
     * @param {string} [defaultValue]
     * @return {string}
     */
    this.getQueryParam = (name, defaultValue) => {
        return url.searchParams.has(name) ? url.searchParams.get(name) : defaultValue;
    };
}

/**
 * @async
 * @param {string} url
 * @param {object} [options={}]
 * @param {boolean} [returnResponseData=true]
 * @return {Promise<ReadableStream<Uint8Array>|any|Response>}
 */
async function ajax(url, options = {}, returnResponseData = true) {
    options || (options = {});
    options = Object.assign({}, options);
    if ((options.body || options.json) && typeof options.method === 'undefined') {
        options.method = 'POST';
    }
    if (options.json) {
        options.headers || (options.headers = {});
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(options.json);
    }

    const fetching = fetch(url, options);
    if (returnResponseData) {
        const response = await fetching;
        response.headers.forEach(h => {
            // console.log('headers: ', h);
        });

        if (response.headers.get('Content-Type').indexOf('application/json') !== -1) {
            return response.json();
        } else {
            return response.body;
        }
    } else {
        return fetching;
    }
}

/**
 * @param {{refresh: boolean, flashes: {key: string, value: string}[]}} response
 */
function handleAjaxResponse(response) {
    if (!response) return;
    if (response.refresh) document.location.reload();
    if (response.flashes) response.flashes.forEach(flash => showFlashMessage(flash.key, flash.value));
}

/**
 * @param {string} action
 * @param {object|Array|*} data
 * @param {string} [method='POST']
 * @param {HTMLElement} [container=document.body]
 */
function submitDynamicForm(action, data, method, container) {
    container || (container = document.body);
    const form = createDynamicForm(action, data, method);
    container.appendChild(form);
    form.submit();

    /**
     * @param {string} action
     * @param {object|Array|*} data
     * @param {string} [method='POST']
     * @return {HTMLFormElement}
     */
    function createDynamicForm(action, data, method) {
        method || (method = 'POST');
        const form = document.createElement('form');
        form.method = method;
        form.action = action;
        const inputs = createInputsRecursive(data);
        for (const input of inputs) {
            form.appendChild(input);
        }
        return form;
    }

    /**
     *
     * @param {object|array|*} data
     * @param {string} [parentKey]
     * @param {string} [type]
     * @return {HTMLInputElement[]}
     */
    function createInputsRecursive(data, parentKey, type) {
        const inputs = [];
        if (Array.isArray(data)) {
            inputs.push(...data.map(value => createInput(`${parentKey}[]`, value, type)));
        } else if (typeof data === 'object') {
            for (const key in data) {
                if (!data.hasOwnProperty(key)) continue;
                inputs.push(...createInputsRecursive(data[key], key, type));
            }
        } else {
            inputs.push(createInput(parentKey, data, type));
        }
        return inputs;
    }

    /**
     * @param {string} name
     * @param {string} value
     * @param {string} [type='hidden']
     * @return {HTMLInputElement}
     */
    function createInput(name, value, type) {
        type || (type = 'hidden');
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.value = value;
        return input;
    }
}

function autoLogIn(un, pw) {
    var form = document.createElement("form");
    var element1 = document.createElement("input");
    var element2 = document.createElement("input");

    form.method = "POST";
    form.action = "login.php";

    element1.value = un;
    element1.name = "un";
    form.appendChild(element1);

    element2.value = pw;
    element2.name = "pw";
    form.appendChild(element2);

    document.body.appendChild(form);

    form.submit();
}

// ORDER //

function VfxOrder(parameters) {
    parameters || (parameters = {});
    if (!parameters.createOrderUrl) throw new Error('Required parameter not provided: createOrderUrl');
    if (!parameters.productId) throw new Error('Required parameter not provided: productId');

    /**
     * @param {string} name
     */
    this.setActivePaymentButton = name => {
        $('[data-payment-buttons]').hide();
        $(`[data-payment-buttons="${name}"]`).show();
    }

    /**
     * @param {string} paymentSystem
     * @return {Promise<ReadableStream<Uint8Array>|*|Response>}
     */
    this.createOrder = paymentSystem => {
        return ajax(parameters.createOrderUrl, {
            json: {
                productId: parameters.productId,
                paymentSystem
            }
        });
    };

    /**
     * @param {number} orderId
     * @param {{ formAction: string, formData: object }} preparedData
     * @param {string} paymentSystem
     */
    this.createPayment = (orderId, preparedData, paymentSystem) => {
        switch (paymentSystem) {
            case 'paypal':
                for (const link of preparedData.formData.links) {
                    if (link.rel === 'approve') {
                        window.location.href = link.href;
                    }
                }
                break;
            default:
                submitDynamicForm(preparedData.formAction, preparedData.formData);
        }
    };

    this.updatePaymentData = (orderId, data) => {
        return ajax(parameters.updateOrderDataUrl.replace('__order_id__', orderId), {
            json: data
        });
    };
}

// POLYFILLS

/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr) {
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}