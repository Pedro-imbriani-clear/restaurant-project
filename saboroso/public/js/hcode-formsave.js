HTMLFormElement.prototype.save = function(config){
    let form = this;
    form.addEventListener( 'submit', e=>{
      e.preventDefault();
      let formDate = new FormData(form);
      fetch(form.action,{
        method:form.method,
        body:formDate
      })
      .then(Response =>Response.json())
      .then(json=>{
        if(json.error){
       if(typeof config.failure === 'function') config.failure(json.error);
        }else{
          if(typeof config.success === 'function') config.success(json);
        }
      }).catch(err=>{
        if(typeof config.failure === 'function') config.failure(err);
      });
    });
    
}