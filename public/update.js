    var check = document.getElementsByClassName("check");
    var data = document.getElementsByClassName("data");
    var li = document.getElementsByTagName("li");

            for (let i =0 ; i<check.length; i++) {
                check[i].onclick = function(e) {
                
                var checkValue = e.target.id;
                    
                if (e.target.checked === true) {
                    data[i].style.textDecoration = "line-through";
                    data[i].style.color = "#fff";
                    li[i].style.background = "#888";
                    var sendData = {completed: e.target.checked};
                    //console.log(sendData);
                    fetch("/update/"+checkValue, {
                        method: "post",
                        body: JSON.stringify(sendData),
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': "application/json"
                        }
                    }).then().then(data => {
                    }).catch();

                }else{

                    var sendData = {completed : e.target.checked};
                    data[i].style.textDecoration = "none";
                    data[i].style.color = "black";
                    li[i].style.background = "none";
                    fetch("/update/"+checkValue, {
                        method: "post",
                        body: JSON.stringify(sendData),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    }).then((res) => res.json()).then(data => {
                    }).catch();
                }
            }
        }