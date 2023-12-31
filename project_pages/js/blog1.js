function validateName(nameInput, event) {
    if(nameInput.value === "") {
        nameInput.nextElementSibling.innerHTML = 'Please enter your name !';
        nameInput.classList.add('error-border');
        event.preventDefault();
        return false;
    }
    else {
        nameInput.nextElementSibling.innerHTML = '';
        nameInput.classList.remove('error-border');
        nameInput.classList.add('success-border');
        return true;
    }
}

function validateEmail(emailinput, event) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailinput.value === "") {
        emailinput.nextElementSibling.innerHTML = "Please enter your email address !";
        emailinput.classList.add('error-border');
        event.preventDefault();
        return false;
    } else if (!emailinput.value.match(emailRegex)) {
        emailinput.nextElementSibling.innerHTML = "Please enter a valid email !";
        emailinput.classList.add('error-border')
        return false;
    } else {
        emailinput.nextElementSibling.innerHTML = "";
        emailinput.classList.remove('error-border');
        emailinput.classList.add('success-border');
        return true;
    }
};

document.getElementById('validateNews').addEventListener('submit', function (event) {
    event.preventDefault();

    let emailNews = document.getElementById("emailNews");
    let nameNews = document.getElementById('nameNews')

    if (!validateName(nameNews, event) || !validateEmail(emailNews, event)) {
        return;
    }

    const serviceID = 'service_jb6v4lv';
    const templateID = 'template_iqtxrl8';

    const emailParams = {
        email_id: emailNews.value,
    };

    emailjs.send(serviceID, templateID, emailParams)
        .then(() => {
            alert('Successful');
            sendAutoReply(emailParams.email_id);
            alert('Please check your email to verify');
            setTimeout(() => {
                location.reload();
            }, 500);
        })
        .catch((err) => {
            alert(JSON.stringify(err));
        });
});

function sendAutoReply(receiverEmail, receiverName) {
    const autoReplyServiceID = 'service_jb6v4lv';
    const autoReplyTemplateID = 'template_iqtxrl8';

    const autoReplyParams = {
        to_email: receiverEmail,
        to_name: receiverName,
    };

    emailjs.send(autoReplyServiceID, autoReplyTemplateID, autoReplyParams)
        .then(() => {
            console.log('sent successfully!');
        })
        .catch((err) => {
            console.error('Error sending auto-reply:', err);
        });
}