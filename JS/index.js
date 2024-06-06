var bookmarkName = document.getElementById("bookmarkname");
var bookmarkUrl = document.getElementById("bookmarkurl");
var bookarray=[];
// console.log(bookmarkname);
// console.log(bookmarkurl);
if(localStorage.getItem("bookmarkName")==null){
  bookarray=[];
}else{
  bookarray = JSON.parse(localStorage.getItem("bookmarkName"));
  display()
}
function submit(){
  if(
    bookmarkName.classList.contains("is-valid")&&
    bookmarkUrl.classList.contains("is-valid")
  ){
    var bookmark = {
      name : bookmarkName.value,
      url : bookmarkUrl.value
    }
    bookarray.push(bookmark)
    display()
    localStorage.setItem("bookmarkName",JSON.stringify(bookarray))
    // console.log(bookarray);
    clearinput()
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }else{
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: "Site name must contain at least 3 characters Site URL must be a valid one", 
      showCloseButton: true
    });
  }
}
function display(){
  var addbookmark="";
  for(var i = 0;i < bookarray.length;i++){
    addbookmark+=
    `
    <tr>
      <td class="pt-3">${i+1}</td>
      <td class="pt-3">${bookarray[i].name}</td>
      <td><a class="btn b-visit px-3 mt-3 mb-4" href="${bookarray[i].url}" target="_blank"><i class="fa-solid fa-eye pe-1"></i>Visit</a></td>
      <td><button class="btn b-submit px-3 mt-3 mb-4" onclick="deletebook(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
    </tr>
    `
  }
  document.getElementById("tableCapition").innerHTML = addbookmark ;
}
function deletebook(del){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger me-3"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "this Bookmark has been deleted.",
        icon: "success"
      });
      document.getElementById("tableCapition").innerHTML = "" ;
      bookarray.splice(del,1)
      display()
      localStorage.setItem("bookmarkName",JSON.stringify(bookarray))
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "this Bookmark is safe",
        icon: "error"
      });
    }
  });
}
function clearinput(){
  bookmarkname.value= null; 
  bookmarkurl.value= null;
  bookmarkName.classList.remove("is-valid")
  bookmarkUrl.classList.remove("is-valid")
}
function validition(ele){
  var regex = {
    bookmarkname :/^[A-Z][a-z]{3,8}$/,
    bookmarkurl :/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i
  }
  if(regex[ele.id].test(ele.value)){
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.add("d-none")
  }else{
    ele.classList.add('is-invalid');
    ele.classList.remove('is-valid');
    ele.nextElementSibling.classList.remove("d-none")
  }
}