
//clic sur bouton
document.getElementById('btnSubmitSign').addEventListener('click',function(){
  if(document.getElementById('password').value == document.getElementById('password2').value){
    PostUser();
  }
  else{
    document.getElementById('erreur').textContent ="Les mots de passe ne correspondent pas petit FDP"
  }
})


//fonction formulaire
function PostUser() {
  console.log("Ok Post");

  var user = document.getElementById("name").value
  var mail = document.getElementById("mail").value
  var password = document.getElementById("password").value
  var image = "hello.png"


  var form = document.createElement('form');
  form.setAttribute('action', '/users/signup');
  form.setAttribute('method', 'post');

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'user');
    inputvar.setAttribute('value', user);
    form.appendChild(inputvar);

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'mail');
    inputvar.setAttribute('value', mail);
    form.appendChild(inputvar);

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'password');
    inputvar.setAttribute('value', password);
    form.appendChild(inputvar);

    var inputvar = document.createElement('input');
    inputvar.setAttribute('type', 'hidden');
    inputvar.setAttribute('name', 'image');
    inputvar.setAttribute('value', image);
    form.appendChild(inputvar);

document.body.appendChild(form);

form.submit();

}
