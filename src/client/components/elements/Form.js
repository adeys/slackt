import {h} from 'preact';

function handleSubmit(handler) {
    return (event) => {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            event.target.classList.add('was-validated');
            return;
        }

        event.target.classList.remove('was-validated');
        typeof handler === 'function' && handler(event);
    };
}

export default ({onSubmit, children, ...props}) => {
    return (
        <form noValidate={true} method="POST" onSubmit={handleSubmit(onSubmit)} {...props}>
            {children}
        </form>
    );
};