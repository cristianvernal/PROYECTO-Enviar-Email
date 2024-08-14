document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    
    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputEmailCopia = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //asignar eventos
    inputEmail.addEventListener('input', validar);
    inputEmailCopia.addEventListener('input', validacionAlternativa);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault(); 

        resetearFormulario();


    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {

        spinner.classList.remove('flex');
        spinner.classList.add('hidden'); 
        
        resetearFormulario();

        //crear alerta luego de apretar enviar.
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded.lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 3000)

        }, 3000);

    }

    function validar(e) {
        if(e.target.value.trim() === '') { // trim elimina espacios en blanco
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('el email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta( e.target.parentElement);
        
        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        

        //comprobar el objeto de email
        comprobarEmail();
    }

    function validacionAlternativa(e){
        
        email[e.target.id] = e.target.value.trim().toLowerCase();
        
        if(e.target.value === ''){
            delete email.cc;
            limpiarAlerta(inputEmailCopia.parentElement);
            comprobarEmail();
            return;
        }
        
        if(!validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido',e.target.parentElement,'error');
            email.cc = '';
            comprobarEmail();
        }else{
            limpiarAlerta(inputEmailCopia.parentElement);
        }
    }
    


 
    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        //generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        //inyectar el error al formulario
        referencia.appendChild(error);
    }


    function limpiarAlerta(referencia){
        //comprueba si ya existe la alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ //expresion regular
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        
    }

    function resetearFormulario() {
                //reiniciar el objeto
                email.email = '';
                email.asunto = '';
                email.mensaje = '';
                formulario.reset();
                comprobarEmail();
    }

    
});