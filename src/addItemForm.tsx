import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('title is required')
        }
    }

    const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={title} onChange={changeItemHandler} onKeyUp={addItemOnKeyUpHandler}/>
            <button onClick={addItemHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;