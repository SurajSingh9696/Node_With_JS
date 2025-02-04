const refresh = document.querySelector("#refresh");

const add = document.querySelector("#add");

const add2 = document.querySelector("#add2");

const input = document.querySelector("#todo");

const cancel = document.querySelector("#cancel");

const hidden = document.querySelector(".above");

const divclone = document.querySelector(".data");

const main = document.querySelector("main")

let donebut;

add.addEventListener("click" , ()=>{
    hidden.style.visibility = "visible";
})

cancel.addEventListener("click" , ()=>{
    hidden.style.visibility = "hidden";
    input.value = "";
})

refresh.addEventListener("click" , ()=>{
    location.reload();
})

const getdata = async()=>{
    let raw = await fetch("http://localhost:3800/getdata");
    return await raw.json();
};

const push = async(data)=>{
    let update = await fetch("http://localhost:3800/update" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })

}

const clone = async()=>{
    let data = await getdata();
    data.forEach((obj)=>{
        let topic = obj.topic;
        let clone  = divclone.cloneNode(true);
        clone.querySelector("h2").innerText = topic;
        let but = clone.querySelector("button");
        but.setAttribute("id" , topic);
        clone.style.display = "flex"
        main.appendChild(clone);
        donebut = main.querySelectorAll("button");
        done();
        console.log(donebut)
    })
}
clone();




add2.addEventListener("click" , async()=>{
    if(input.value == ""){
        alert("Please enter a topic");
    }
    else{
        let data = await getdata();
        let obj = {topic : input.value};
        data.push(obj);
        push(data);
        donebut = main.querySelectorAll("button");
        done();
        location.reload();
    }
})

const done = ()=>{
    donebut.forEach((item)=>{
        item.addEventListener("click" , async()=>{
            let del = item.getAttribute("id");
            let data = await getdata();
            let newdata = data.filter((item)=>{
                return item.topic != del
            })
            push(newdata);
            location.reload();
        })
    })
    
};
