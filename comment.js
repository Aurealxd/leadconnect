function editComment (buttonNumber) {
    if (document.querySelector('form[id="commentForm"]')) return;

    let commentForm = document.createElement("form");
    commentForm.setAttribute("id", "commentForm");

    let commentFormText = document.createElement("input");
    commentFormText.setAttribute("type", "text");
    commentFormText.setAttribute("id", "commentFormText");
    
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
        let url = 'https://sitecheck.leadcm.com/api/v1/setComment/' + buttonNumber;
        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(msg),
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(response => response.json())
        .then(console.log);
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
}

/*
function placeButtons () {
    let h2_tags = document.querySelectorAll('h2');
    let h2_strings = [];
    let stringToFind = "Checking";
    let j = 0;
    for(var i = 0; i<h2_tags.length; i++) {
        if (h2_tags[i].innerHTML.indexOf(stringToFind) === 4) {
            h2_strings[j] = h2_tags[i].innerHTML;
            j++;
            h2_tags[++i].innerHTML = '<button onclick="editComment()" id="editCommentBtn">Edit comment</button>';
        }
    }
    console.log(h2_strings);
}
*/