var uploadimg = document.getElementById('display-picture');
if(localStorage.image != ''){

  uploadimg.src= `/uploads/${localStorage.name.concat(localStorage.image)}`
}
// uploadimg.src= `/uploads/${localStorage.name.concat(localStorage.image)}`
/**Fetch Users */
function fetchUsers() {
  var company_id = localStorage.company_id;
  axios.defaults.headers.common['x-auth-token'] = localStorage.token;
  axios.post('/api/fetchUsers', { company_id: company_id }).then(async (response) => {
    // console.log("response", response.data.users.length)
    $("#team-count").text(response.data.users.length);
    var text = "";
    response.data.users.map((item) => {
       console.log("item", item.name,item.avatar)
       var image = item.name.concat(item.avatar)
      text += `<div class="sidebar-user-pro media border-end">
                  <div class="position-relative mx-auto">
                  ${item.avatar != '' && item.avatar != undefined ? `<img src=/uploads/${image} alt="user"  id="uploadimg" class="rounded-circle thumb-md" />`: 
                  `<img src='assets/images/users/user-4.jpg' alt="imgs"  id="uploadimg" class="rounded-circle thumb-md"/>` }
                  </div>
                  <div class="media-body ms-2 user-detail align-self-center">
                      <h5 class="font-14 m-0 ">`+ item.name + `</h5>
                      <p class="opacity-50 mb-0">`+ item.user_type + `</p>
                  </div>
              </div>`;
    });
    $("#team").html(text);

  }).catch(async (errors) => {
  })
}
fetchUsers()

/**Fetch Meetings */

document.getElementById('edit').addEventListener('click',function(){
  window.location.href = '/profile/';
})