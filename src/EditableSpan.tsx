import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const switchEditMode = () => {
        setEditMode(!editMode)
        props.onChange(title)
    }

    const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? <input value={title} onChange={changeItemHandler} onBlur={switchEditMode} autoFocus/> : <span onDoubleClick={switchEditMode}>{props.value}</span>
    );
};

export default EditableSpan;