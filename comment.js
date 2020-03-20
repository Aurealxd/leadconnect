function editComment (buttonNumber) {
    if (document.querySelector('form[id="commentForm"]')) return;

    let commentForm = document.createElement("form");
    commentForm.setAttribute("id", "commentForm");

    let commentFormText = document.createElement("input");
    commentFormText.setAttribute("type", "text");
    commentFormText.setAttribute("id", "commentFormText");
    commentFormText.setAttribute("value", document.querySelector('h2[id=showComment' + buttonNumber + ']').innerHTML.substring(9));
    commentFormText.select();
    
    /*
    commentFormText.onclick = function () {
        this.select();
    }
    */

    let commentFormSave = document.createElement("input");
    commentFormSave.setAttribute("type", "button");
    commentFormSave.setAttribute("id", "commentFormSave");
    commentFormSave.setAttribute("value", "Save");

    let commentFormCancel = document.createElement("input");
    commentFormCancel.setAttribute("type", "button");
    commentFormCancel.setAttribute("id", "commentFormCancel");
    commentFormCancel.setAttribute("value", "Cancel");

    commentFormSave.onclick = function () {
        let msg = {
            comment: document.querySelector('input[id="commentFormText"]').value
            };
        
        let h2Id = 'showComment' + buttonNumber;
        document.querySelector('h2[id=' + h2Id + ']').innerHTML = 'comment: ' + msg.comment;
        console.log('Comment from input =', msg.comment);
        
        let url = 'https://sitecheck.leadcm.com/api/v1/setComment/' + buttonNumber;
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(  
            function(response) {
                if (response.ok) {
                    console.log('Response status =', response.status);
                    response.json().then(function(data) {
                        console.log('Comment from response =', data.site.comment);
                        if (data.site.comment == msg.comment) {
                            console.log('Comments from response and input are equal, no need to update');
                        } else {
                            console.log('Responded comment differs from inputed, comment text updated');
                            document.querySelector('h2[id=' + h2Id + ']').innerHTML = 'comment: ' + data.site.comment;
                        }
                    });
                    showMessage("Comment saved", "green");
                } else {
                    showMessage("Response error", "red");
                }
        });

        document.body.removeChild(commentForm);
    }

    commentFormCancel.onclick = function () {
        document.body.removeChild(commentForm);
    }

    commentForm.appendChild(commentFormText);
    commentForm.appendChild(commentFormSave);
    commentForm.appendChild(commentFormCancel);

    let buttonId = 'editCommentBtn' + buttonNumber;

    document.querySelector('button[id=' + buttonId + ']').after(commentForm);
    document.querySelector('input[id="commentFormText"]').focus();

    function showMessage(infoMessage, infoColor) {
        let messageSpan = document.createElement("span");
        messageSpan.innerHTML = infoMessage;
        messageSpan.style.paddingLeft = "10px";
        messageSpan.style.color = infoColor;
        document.querySelector('button[id=' + buttonId + ']').after(messageSpan);
        setTimeout(function(){
            document.body.removeChild(messageSpan);
        }, 2500);
    }
    
    commentForm.addEventListener('keydown', function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
        }
    });
}
