HTMLFormElement.prototype.save = function(){
    let form = this;
    return new Promise((resolve,reject)=>{
     form.addEventListener( 'submit', e=>{
        e.preventDefault();
        let formDate = new FormData(form);
        fetch(form.action,{
          method:form.method,
          body:formDate
        })
        .then(Response =>Response.json())
        .then(json=>{
        resolve(json);

        }).catch(err=>{
            reject(err)
        });
      });
    });
}