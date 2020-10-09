import { h, Fragment } from 'preact';
import {useState} from "preact/hooks";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className='container m-4 text-center'>
            <div className='mb-2'>
                Welcome to Slackt
            </div>
            <div className='text-center'>
                <div>Button has been clicked {count} times</div>
                <button className='btn btn-sm btn-outline-success' onClick={() => setCount(count + 1)}>Increment</button>
            </div>
        </div>
    )
};

export default App;