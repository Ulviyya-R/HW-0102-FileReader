let inp = document.querySelector(".form-control");
let images = document.querySelector(".images");
let aldelbutton = document.querySelector("#delete");
let pushb = document.querySelector("#push");
let arr = [];

let isCreated = false;

inp.addEventListener("change", function (e) {
  let files = Array.from(e.target.files);
  files.forEach((file) => {
    ShowImage(file);
  });
});

function ShowImage(file) {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("loadend", function () {
    let src = fileReader.result;
    let image = document.createElement("div");
    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerText = "X";
    btn.style.position = "absolute";
    btn.style.right = "0px";
    btn.style.width = "25px";
    btn.style.height = "25px";
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
    image.style.width = "150px";
    image.style.height = "150px";
    image.style.position = "relative";
    image.style.marginRight="50px";
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.src = src;
    image.append(img);
    images.appendChild(image);
    image.appendChild(btn);
    image.addEventListener("dblclick", function () {
      image.style.transition = ".5s";
      image.style.width = "180px";
      image.style.height = "180px";
      image.style.boxShadow = "1px 1px 25px 1px gray";
      arr.push(image);
     
      console.log(arr);
      let SDelete = document.createElement("button");
      let cancel = document.createElement("button");
      SDelete.innerHTML = "Select Delete";
      SDelete.style.position = "absolute";
      SDelete.style.right = "90px";
      cancel.innerHTML = "Cancel";
      cancel.style.position = "absolute";
      cancel.style.right = "10px";
      SDelete.className = "btn btn-outline-danger";
      cancel.className = "btn btn-outline-success";

      document.body.prepend(SDelete);
      document.body.prepend(cancel);

      cancel.addEventListener("click", function () {
        arr.forEach((element) => {
          element.style.transition = ".5s";
          element.style.width = "150px";
          element.style.height = "150px";
          element.style.boxShadow = "0 0 0 0 white";
          
        });
        SDelete.remove();
        cancel.remove();
        
      });
      SDelete.addEventListener("click", function () {
        arr.forEach((element) => {
          if (!(element.style.width == "150px")) {
            element.remove();
          }
        });
        SDelete.remove();
        cancel.remove();
      });
    });
    aldelbutton.addEventListener("click",function(){
      image.remove();
    })
    btn.addEventListener("click", function (e) {
      let result = confirm("are you sure this photo delete");
      if (result) {
        image.remove();
        let push = document.createElement("button");
        push.className = "btn btn-outline-primary";
        push.innerHTML = "Push";
        push.style.width = "100px";

        let lastfoto;

        if (!isCreated) {
          document.body.appendChild(push);
          isCreated = true;
        }
        push.addEventListener("click", function () {
          lastfoto = image;
          push.style.marginTop="100px";
          push.remove();
          images.append(lastfoto);
        });
      }
    });
  });
}
