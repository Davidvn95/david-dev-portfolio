import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });
      const isSuccess = await response.json();
      setIsLoading(false);
      if (isSuccess.success) {
        Swal.fire({
          title: '¡Perfecto!',
          text: 'Tu mensaje ha sido enviado, me contactaré contigo lo antes posible.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Oops...!',
          text: 'Parece que hubo un problema, puedes contactarme por linkedIn y lo resuelvo',
          footer:
            '<a href="https://www.linkedin.com/in/david-de-jes%C3%BAs-vergara-navarro-62169225a/" target="_blank">LinkedIn</a>',
        });
      }
      form.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Oops...!',
        text: 'Parece que hubo un problema, puedes contactarme por linkedIn y lo resuelvo',
        footer:
          '<a href="https://www.linkedin.com/in/david-de-jes%C3%BAs-vergara-navarro-62169225a/" target="_blank">LinkedIn</a>',
      });
      console.log(error);
    }
  };
  return (
    <div className='w-full flex justify-center'>
      {isLoading && (
        <div className='absolute w-full h-[100vh] flex justify-center items-center gap-6'>
          <span className='relative flex h-4 w-4 justify-center items-center'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-amber-500'></span>
          </span>
          <span className='relative flex h-4 w-4 justify-center items-center'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
          </span>
          <span className='relative flex h-4 w-4 justify-center items-center'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-amber-500'></span>
          </span>
        </div>
      )}
      <form id='email' onSubmit={handleSubmit} className='grid place-items-center w-full max-w-2xl'>
        <fieldset className='grid shadow-md border-[.5px] border-slate-400 dark:border-slate-800 dark:bg-transparent dark:shadow-slate-600 dark:shadow-sm rounded-2xl p-5 w-full place-items-center'>
          <legend className='font-semibold text-amber-600 dark:text-amber-500 text-xl p-1 rounded-lg'>
            Formulario de contacto
          </legend>
          <label className='flex flex-col w-full p-2 font-semibold -mt-3'>
            Nombre
            <input
              name='name'
              className='font-medium shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              type='text'
              placeholder='Tu nombre'
              required
            />
          </label>
          <label className='flex flex-col w-full p-2 font-semibold -mt-3'>
            Correo
            <input
              name='email'
              className='font-medium shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              type='email'
              placeholder='tu@email.com'
              required
            />
          </label>
          <label className='flex flex-col w-full p-2 font-semibold'>
            Asunto
            <input
              name='subject'
              className='font-medium shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              type='text'
              placeholder='Tu idea de proyecto'
              required
            />
          </label>
          <label className='flex flex-col w-full p-2 font-semibold'>
            Mensaje
            <textarea
              name='message'
              className='font-medium block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='Descripción del proyecto y los requerimientos...'
              id='message'
              cols={30}
              rows={10}
              minLength={100}
              maxLength={300}
              required
            ></textarea>
          </label>
        </fieldset>
        <button
          id='send'
          type='submit'
          className='px-3 py-2 mt-3 text-sm font-semibold text-center inline-flex items-center transition ease-in delay-150 hover:text-slate-900 border-2 border-amber-400 hover:border-transparent hover:bg-amber-400 rounded-md'
        >
          <svg className='w-3 h-3 me-2' aria-hidden='true' fill='currentColor' viewBox='0 0 20 16'>
            <path d='m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z'></path>
            <path d='M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z'></path>
          </svg>
          Enviar
        </button>
      </form>
    </div>
  );
}
