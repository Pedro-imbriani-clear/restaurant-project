class hcodeGrid{

    constructor(configs){

        configs.listeners = Object.assign({
            afterUpdateClick:(e)=>{

                $('#modal-update').modal('show');
            },
            afterDeleteClick:(e)=>{
                window.location.reload();
            },
            afterFormCreate: (e) =>{
              window.location.reload();
            },
            afterFormUpdate: (e) =>{
                window.location.reload();
            },
            afterFormCreateError: (e) =>{
                console.log('erro')
                window.location.reload();
            },
            afterFormUpdateError: (e) =>{
                console.log('erro')
                window.location.reload();
            }

        }, configs.listeners)
        this.options = Object.assign( {}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad:(form,name,data)=>{
            let input = form.querySelector('[name='+ name+"]");
            if(input) input.value = data[name];
            }
        }, configs);
        console.log(this.options.formUpdate);
        this.row = [...document.querySelectorAll('table tbody tr')]
        this.initForms();
        this.initButtons();



    }

    initForms(){

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save({
            success:()=>{
                this.fireEvent('afterFormCreate');

            },
            failure:()=>{
                this.fireEvent('afterFormCreateError');
            }
        });


        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save({
            success:()=>{
                this.fireEvent('afterFormUpdate');
 
            },
            failure:()=>{
                this.fireEvent('afterFormUpdateError');
            }
        });
       

    }
    fireEvent(name, args){

        if(typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args)

    }
    getTrData(e){
        let tr = e.composedPath().find(el => {

            return (el.tagName.toUpperCase() === 'TR');

        });
        return JSON.parse(tr.dataset.row);
    }
    btnUpdateClick(e){
        this.fireEvents('beforeUpdateClick',[e]);
    
        let data = this.getTrData(e);

        for(let name in data){
            this.options.onUpdateLoad(this.formUpdate,name,data);

       

        }
  
        this.fireEvents('afterUpdateClick',[e]);
    }
    btnDeleteClick(e){
        this.fireEvent('beforeDeleteClick');
        let data = this.getTrData(e);

        if(confirm(eval('`'+this.options.deleteMsg+'`'))){

        fetch(eval('`'+this.options.deleteUrl+'`'), {
            method: 'DELETE'
        })
        .then(response =>  response.json())
        .then(json => {
            this.fireEvent('afterDeleteClick');
        });

    }
    }
    initButtons(){

        this.rows.forEach(row =>{
            [...row.querySelector('.btn')].forEach(btn =>{
               btn.addEventListener('click',e=>{
                if(e.target.classList.contains(this.options.btnUpdate)){
                    this.btnUpdateClick(e);
                }else if(e.target.classList.contains(this.options.btnUpdate)){
                    this.btnDeleteClick(e);
                }else{
                    this.fireEvent('buttonClick',[e.target, this.getTrData(e), e])
                }

               });
            });
        });



    };

}